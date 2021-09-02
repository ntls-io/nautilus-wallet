import { Injectable } from '@angular/core';
import { AlgorandTransactionSigned, WalletDisplay } from 'src/schema/entities';
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
          name,
        });
      }
    } catch (err) {
      this.walletStore.setError(err);
    }
  }

  async openWallet(walletId: string, pin: string) {
    try {
      const res = await this.ntlsService.openWallet({
        wallet_id: walletId,
        auth_pin: pin,
      });
      console.log(res);

      if ((res as { Failed: string }).Failed) {
        this.walletStore.setError((res as { Failed: string }).Failed);
      } else {
        const opened = (res as { Opened: WalletDisplay }).Opened;
        this.walletStore.update({
          walletId,
          name: opened.owner_name,
          pin,
        });
      }
    } catch (err) {
      this.walletStore.setError(err);
    }
  }

  async sendFunds(recieverId: string, amount: number) {
    try {
      const sessionData = this.walletStore.getValue();
      const transaction = await this.ntlsService.createUnsignedTransaction({
        amount: amount * 100000,
        from: sessionData.walletId,
        to: recieverId,
      });
      const res = await this.ntlsService.signTransaction({
        auth_pin: this.walletStore.getValue().pin,
        wallet_id: this.walletStore.getValue().walletId,
        algorand_transaction_bytes: transaction.bytesToSign(),
      });
      const submitRes = await this.ntlsService.submitSignedTransaction(
        (res as { Signed: AlgorandTransactionSigned }).Signed
          .signed_transaction_bytes
      );
      this.walletStore.update({ transactionId: submitRes.txId });
    } catch (err) {
      console.log(err);
    }
  }
}

/**
 * Helper for exhaustiveness checking: mark unreachable values.
 *
 * TODO(Pi): Move this into a utility module somewhere.
 */
export const never = (value: never): never => {
  console.error('expected never, got:', value);
  throw new TypeError('expected never, got value (see error log)');
};
