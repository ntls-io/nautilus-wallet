import { Injectable } from '@angular/core';
import { EnclaveService } from 'src/app/services/enclave/enclave.service';
import { MessagingService } from 'src/app/services/messaging.service';
import { SearchService } from 'src/app/services/search.service';
import { SessionQuery } from 'src/app/state/session.query';
import { withLoggedExchange } from 'src/app/utils/console.helpers';
import { panic } from 'src/app/utils/errors/panic';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import { never } from 'src/helpers/helpers';
import {
  CreateWallet,
  CreateWalletResult,
  GetXrplWallet,
  GetXrplWalletResult,
  LoadOnfidoCheck,
  LoadOnfidoCheckResult,
  OnfidoCheckResult,
  OpenWallet,
  OpenWalletResult,
  PinReset,
  PinResetResult,
  SaveOnfidoCheck,
  SaveOnfidoCheckResult,
  SignTransaction,
  SignTransactionResult,
  StartPinReset,
  StartPinResetResult,
  TransactionSigned,
  TransactionToSign,
  UpdateOtpPhoneNumber,
  UpdateOtpPhoneNumberResult,
} from 'src/schema/actions';
import { XrplPublicKeyHex } from '../../schema/types';
import { SessionStore } from './session.store';

/**
 * This service manages session state and operations associated with the wallet enclave.
 */
@Injectable({ providedIn: 'root' })
export class SessionService {
  constructor(
    private sessionStore: SessionStore,
    private sessionQuery: SessionQuery,
    private enclaveService: EnclaveService,
    private messagingService: MessagingService,
    private searchService: SearchService,

    private notification: SwalHelper
  ) {}

  /**
   * Create a new wallet.
   *
   * @see EnclaveService#createWallet
   */
  async createWallet(
    name: string,
    pin: string,
    auth_map: Map<string, string>,
    phone_number?: string
  ): Promise<string> {
    try {
      const request: CreateWallet = {
        owner_name: name,
        auth_pin: pin,
        phone_number,
        auth_map: Object.fromEntries(auth_map),
      };
      const result: CreateWalletResult = await this.enclaveService.createWallet(
        request
      );
      if ('Created' in result) {
        const wallet = result.Created;
        this.sessionStore.update({ wallet, pin });
        try {
          await this.searchService.insertWalletAddress({
            wallet_id: wallet.wallet_id,
            phone_number: wallet.phone_number,
            owner_name: wallet.owner_name,
          });
        } catch (err) {
          console.log(err);
        }
        return wallet.wallet_id;
      } else if ('Failed' in result) {
        this.sessionStore.setError(result);
        throw panic('SessionService: createWallet failed', result);
      } else {
        throw never(result);
      }
    } catch (err) {
      this.sessionStore.setError(err);
      return 'error';
    }
  }

  // TODO(Pi): Returning a string for failure and undefined for success is surprising; this needs better handling.
  /**
   * Open an existing wallet.
   *
   * @return An error on failure, or undefined on success
   *
   * @see EnclaveService#openWallet
   */
  async openWallet(walletId: string, pin: string): Promise<string | undefined> {
    const request: OpenWallet = { wallet_id: walletId, auth_pin: pin };
    const result: OpenWalletResult = await this.enclaveService.openWallet(
      request
    );

    if ('Opened' in result) {
      const wallet = result.Opened;

      // XXX: Maintain invariant: clear store before adding new active wallet state.
      this.sessionStore.reset();

      this.sessionStore.update({ wallet, pin });

      return undefined; // Success
    } else if ('InvalidAuth' in result) {
      return 'Authentication failed, please ensure that the address and password provided is correct.';
    } else if ('Failed' in result) {
      console.error(result);
      throw new Error(result.Failed);
    } else if ('AccountLocked' in result) {
      return 'You have failed to enter the correct pin 3 times. Please reset your pin in order to access your account.';
    } else {
      throw never(result);
    }
  }

  /**
   * Update Phone number to be used for OTP.
   *
   * @see EnclaveService#UpdateOtpPhoneNumber
   */
  async updateOtpPhoneNumber(
    wallet_id: string,
    new_phone_number: string,
    auth_pin: string
  ): Promise<UpdateOtpPhoneNumberResult> {
    const request: UpdateOtpPhoneNumber = {
      wallet_id,
      new_phone_number,
      auth_pin,
    };
    const result: UpdateOtpPhoneNumberResult =
      await this.enclaveService.updateOtpPhoneNumber(request);

    if ('Updated' in result) {
      this.sessionStore.update((state) => {
        if (state.wallet) {
          state.wallet.otp_phone_number = new_phone_number;
        }
      });
    }

    return result;
  }

  /**
   * Start the PIN reset session.
   *
   * @see EnclaveService#startPinReset
   */
  async startPinReset(
    walletId: string,
    auth_map: Map<string, string>,
    client_pk: Uint8Array
  ): Promise<StartPinResetResult> {
    const request: StartPinReset = {
      wallet_id: walletId,
      wallet_auth_map: Object.fromEntries(auth_map),
      client_pk,
    };
    const result: StartPinResetResult = await this.enclaveService.startPinReset(
      request
    );
    return result;
  }

  /**
   * If first session is successful, pin is reset..
   *
   * @see EnclaveService#startPinReset
   */
  async pinReset(
    walletId: string,
    new_pin: string,
    auth_map: Map<string, string>
  ): Promise<PinResetResult> {
    const request: PinReset = {
      wallet_id: walletId,
      new_pin,
      wallet_auth_map: Object.fromEntries(auth_map),
    };
    const result: PinResetResult = await this.enclaveService.pinReset(request);

    return result;
  }
  /**
   * Get public key of an existing wallet address.
   *
   * @see EnclaveService#getXrplWallet
   */
  async getXrplWalletPublicKey(walletId: string): Promise<XrplPublicKeyHex> {
    const request: GetXrplWallet = { wallet_id: walletId };
    const result: GetXrplWalletResult = await this.enclaveService.getXrplWallet(
      request
    );

    if ('Opened' in result) {
      return result.Opened.public_key_hex;
    } else if ('Failed' in result) {
      console.error(result);
      throw new Error(result.Failed);
    } else {
      throw never(result);
    }
  }

  /**
   * Sign a transaction using the active session's wallet.
   *
   * This takes care of wrapping {@link SignTransaction}
   * and unwrapping {@link SignTransactionResult}.
   *
   * @see EnclaveService#signTransaction
   */
  async signTransaction(
    transaction_to_sign: TransactionToSign,
    wallet_id?: string,
    account_pin?: string
  ): Promise<TransactionSigned> {
    const { wallet, pin } = this.sessionQuery.assumeActiveSession();
    const active_wallet_id = wallet.wallet_id;

    const wallet_id_tx = wallet_id ? wallet_id : active_wallet_id;

    const pin_tx = account_pin ? account_pin : pin;

    const signRequest: SignTransaction = {
      auth_pin: pin_tx,
      wallet_id: wallet_id_tx,
      transaction_to_sign,
    };

    const signResult: SignTransactionResult = await withLoggedExchange(
      'SessionService: EnclaveService.signTransaction:',
      async () => await this.enclaveService.signTransaction(signRequest),
      signRequest
    );
    if ('Signed' in signResult) {
      return signResult.Signed;
    } else if ('InvalidAuth' in signResult) {
      this.sessionStore.setError({ signResult });
      throw new Error('SessionService.signTransaction: invalid auth');
    } else if ('Failed' in signResult) {
      this.sessionStore.setError({ signResult });
      throw panic(
        `SessionService.signTransaction failed: ${signResult.Failed}`,
        signResult
      );
    } else {
      throw never(signResult);
    }
  }

  /**
   * Save the given Onfido check result to the active session's wallet.
   *
   * @see EnclaveService#saveOnfidoCheck
   */
  async saveOnfidoCheck(check: OnfidoCheckResult): Promise<void> {
    const { wallet, pin } = this.sessionQuery.assumeActiveSession();

    const request: SaveOnfidoCheck = {
      wallet_id: wallet.wallet_id,
      auth_pin: pin,
      check,
    };
    const result: SaveOnfidoCheckResult =
      await this.enclaveService.saveOnfidoCheck(request);

    if ('Saved' in result) {
      // XXX(Pi): It might be better to explicitly load this back,
      //          rather than optimistically persisting like this?
      this.sessionStore.update({ onfidoCheck: check });

      if (wallet.phone_number) {
        const message = {
          to_phone_number: wallet.phone_number,
          body: `Onfido check result: ${check.result}`,
        };
        await withLoggedExchange(
          'SessionService',
          async () => await this.messagingService.sendMessage(message),
          message
        );
      }

      return;
    } else if ('InvalidAuth' in result) {
      throw panic('TODO', result);
    } else if ('Failed' in result) {
      console.error(result);
      throw new Error(result.Failed);
    } else {
      throw never(result);
    }
  }

  /**
   * Load the saved Onfido check result for the active session's wallet, if any.
   *
   * @see EnclaveService#loadOnfidoCheck
   */
  async loadOnfidoCheck(): Promise<OnfidoCheckResult | undefined> {
    const { wallet, pin } = this.sessionQuery.assumeActiveSession();

    const request: LoadOnfidoCheck = {
      wallet_id: wallet.wallet_id,
      auth_pin: pin,
    };
    const result: LoadOnfidoCheckResult =
      await this.enclaveService.loadOnfidoCheck(request);

    if ('Loaded' in result) {
      const onfidoCheck: OnfidoCheckResult = result.Loaded;
      this.sessionStore.update({ onfidoCheck });
      return onfidoCheck;
    } else if ('NotFound' in result) {
      return undefined;
    } else if ('InvalidAuth' in result) {
      // TODO: Better error representation.
      throw new Error(
        'Authentication failed, please ensure that the address and password provided is correct.'
      );
    } else if ('Failed' in result) {
      console.error(result);
      throw new Error(result.Failed);
    } else {
      throw never(result);
    }
  }
}
