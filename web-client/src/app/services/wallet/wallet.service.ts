import { Injectable } from '@angular/core';
import { EnclaveService } from 'src/app/services/enclave/enclave.service';
import { SessionStore } from 'src/app/stores/session/session.store';
import { AlgorandTransactionSigned, WalletDisplay } from 'src/schema/entities';

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

  async openWallet(walletId: string, pin: string) {
    try {
      const res = await this.enclaveService.openWallet({
        wallet_id: walletId,
        auth_pin: pin,
      });
      console.log(res);

      if ((res as { Failed: string }).Failed) {
        this.sessionStore.setError((res as { Failed: string }).Failed);
      } else {
        const opened = (res as { Opened: WalletDisplay }).Opened;
        this.sessionStore.update({
          walletId,
          name: opened.owner_name,
          pin,
        });
      }
    } catch (err) {
      this.sessionStore.setError(err);
    }
  }

  async sendFunds(recieverId: string, amount: number) {
    try {
      const sessionData = this.sessionStore.getValue();
      const transaction = await this.enclaveService.createUnsignedTransaction({
        amount: amount * 100000,
        from: sessionData.walletId,
        to: recieverId,
      });
      const res = await this.enclaveService.signTransaction({
        auth_pin: this.sessionStore.getValue().pin,
        wallet_id: this.sessionStore.getValue().walletId,
        algorand_transaction_bytes: transaction.bytesToSign(),
      });
      const submitRes = await this.enclaveService.submitSignedTransaction(
        (res as { Signed: AlgorandTransactionSigned }).Signed
          .signed_transaction_bytes
      );
      this.sessionStore.update({ transactionId: submitRes.txId });
    } catch (err) {
      console.log(err);
    }
  }
}
