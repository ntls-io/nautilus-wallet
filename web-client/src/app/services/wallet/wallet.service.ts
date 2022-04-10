import { Injectable } from '@angular/core';
import { WalletAlgorandService } from 'src/app/services/wallet-algorand.service';
import { SessionStore } from 'src/app/stores/session';
import { never } from 'src/helpers/helpers';
import { EnclaveService } from '../enclave';

type MaybeError = string | undefined;

@Injectable({ providedIn: 'root' })
export class WalletService {
  constructor(
    private sessionStore: SessionStore,
    private enclaveService: EnclaveService,
    private walletAlgorandService: WalletAlgorandService
  ) {}

  async createWallet(name: string, pin: string) {
    try {
      const res = await this.enclaveService.createWallet({
        owner_name: name,
        auth_pin: pin,
      });

      if ('Created' in res) {
        const { wallet_id: walletId } = res.Created;
        this.sessionStore.update({ walletId, name });
      } else if ('Failed' in res) {
        this.sessionStore.setError(res);
      } else {
        never(res);
      }
    } catch (err) {
      this.sessionStore.setError(err);
    }
  }

  async openWallet(walletId: string, pin: string): Promise<MaybeError> {
    const res = await this.enclaveService.openWallet({
      wallet_id: walletId,
      auth_pin: pin,
    });

    if ('Opened' in res) {
      const { owner_name: name } = res.Opened;
      this.sessionStore.update({ walletId, name, pin });
      await this.walletAlgorandService.updateBalance();
      return undefined;
    } else if ('InvalidAuth' in res) {
      return 'Authentication failed, please ensure that the address and password provided is correct.';
    } else if ('Failed' in res) {
      console.error(res);
      throw new Error(res.Failed);
    } else {
      never(res);
    }
  }
}
