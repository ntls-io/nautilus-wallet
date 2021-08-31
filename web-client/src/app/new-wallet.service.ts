import { Injectable } from '@angular/core';
import { WalletDisplay } from 'src/schema/entities';
import { WalletService } from './services/wallet.service';
import { WalletStore } from './wallet.store';

@Injectable({
  providedIn: 'root',
})
export class NewWalletService {
  constructor(
    private walletStore: WalletStore,
    private ntlsService: WalletService
  ) {}

  async createWallet(name: string, pin: string) {
    try {
      const res = await this.ntlsService.createWallet({
        owner_name: name,
        auth_pin: pin,
      });

      if ((res as { Failed: string }).Failed) {
        this.walletStore.setError((res as { Failed: string }).Failed);
      } else {
        this.walletStore.update({
          walletId: (res as { Created: WalletDisplay }).Created.wallet_id,
          name: name,
        });
      }
    } catch (err) {
      this.walletStore.setError(err);
    }
  }

  async openWallet(walletId: string, pin: string) {}
}
