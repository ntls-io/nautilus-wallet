import { Injectable } from '@angular/core';
import { EnclaveService } from 'src/app/services/enclave/enclave.service';
import { SessionStore } from 'src/app/stores/session/session.store';
import { WalletDisplay } from 'src/schema/entities';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  constructor(
    private sessionStore: SessionStore,
    private enclaveService: EnclaveService
  ) {}

  async createWallet(name: string, pin: string) {
    try {
      const res = await this.enclaveService.createWallet({
        owner_name: name,
        auth_pin: pin,
      });

      if ((res as { Failed: string }).Failed) {
        this.sessionStore.setError((res as { Failed: string }).Failed);
      } else {
        this.sessionStore.update({
          walletId: (res as { Created: WalletDisplay }).Created.wallet_id,
          name,
        });
      }
    } catch (err) {
      this.sessionStore.setError(err);
    }
  }

  async openWallet(walletId: string, pin: string) {}
}
