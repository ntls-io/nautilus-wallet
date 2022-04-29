import { Injectable } from '@angular/core';
import { EnclaveService } from 'src/app/services/enclave/index';
import { SessionQuery } from 'src/app/state/session.query';
import { withLoggedExchange } from 'src/app/utils/console.helpers';
import { panic } from 'src/app/utils/errors/panic';
import { never } from 'src/helpers/helpers';
import {
  CreateWallet,
  CreateWalletResult,
  LoadOnfidoCheck,
  LoadOnfidoCheckResult,
  OnfidoCheckResult,
  OpenWallet,
  OpenWalletResult,
  SaveOnfidoCheck,
  SaveOnfidoCheckResult,
  SignTransaction,
  SignTransactionResult,
  TransactionSigned,
  TransactionToSign,
} from 'src/schema/actions';
import { SessionStore } from './session.store';

/**
 * This service manages session state and operations associated with the wallet enclave.
 */
@Injectable({ providedIn: 'root' })
export class SessionService {
  constructor(
    private sessionStore: SessionStore,
    private sessionQuery: SessionQuery,
    private enclaveService: EnclaveService
  ) {}

  /**
   * Create a new wallet.
   *
   * @see EnclaveService#createWallet
   */
  async createWallet(name: string, pin: string): Promise<void> {
    try {
      const request: CreateWallet = { owner_name: name, auth_pin: pin };
      const result: CreateWalletResult = await this.enclaveService.createWallet(
        request
      );
      if ('Created' in result) {
        const wallet = result.Created;
        this.sessionStore.update({ wallet, pin });
      } else if ('Failed' in result) {
        this.sessionStore.setError(result);
        throw panic('SessionService: createWallet failed', result);
      } else {
        never(result);
      }
    } catch (err) {
      this.sessionStore.setError(err);
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
      this.sessionStore.update({ wallet, pin });

      return undefined; // Success
    } else if ('InvalidAuth' in result) {
      return 'Authentication failed, please ensure that the address and password provided is correct.';
    } else if ('Failed' in result) {
      console.error(result);
      throw new Error(result.Failed);
    } else {
      never(result);
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
    transaction_to_sign: TransactionToSign
  ): Promise<TransactionSigned> {
    const { wallet, pin } = this.sessionQuery.assumeActiveSession();

    const signRequest: SignTransaction = {
      auth_pin: pin,
      wallet_id: wallet.wallet_id,
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
      throw panic('SessionService.signTransaction: invalid auth', signResult);
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
