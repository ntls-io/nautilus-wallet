import { Injectable } from '@angular/core';
import { EnclaveService } from 'src/app/services/enclave/index';
import { SessionAlgorandService } from 'src/app/state/session-algorand.service';
import { never } from 'src/helpers/helpers';
import {
  CreateWallet,
  CreateWalletResult,
  OpenWallet,
  OpenWalletResult,
} from 'src/schema/actions';
import { SessionStore } from './session.store';

/**
 * This service manages session state and operations associated with the wallet enclave.
 */
@Injectable({ providedIn: 'root' })
export class SessionService {
  constructor(
    private sessionStore: SessionStore,
    private enclaveService: EnclaveService,
    private sessionAlgorandService: SessionAlgorandService
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

      // FIXME(Pi): This update should not be happening here.
      await this.sessionAlgorandService.loadAccountData();

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
}
