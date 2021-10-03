import { Injectable } from '@angular/core';
import { EnclaveService } from 'src/app/services/enclave/enclave.service';
import { SessionStore } from 'src/app/stores/session/session.store';
import { never } from 'src/helpers/helpers';
import { AlgorandTransactionSigned } from 'src/schema/entities';

type MaybeError = string | undefined;
@Injectable({
  providedIn: 'root',
})
export class WalletService {
  constructor(
    private sessionStore: SessionStore,
    private enclaveService: EnclaveService
  ) {}

  async clearError() {
    this.sessionStore.setError(undefined);
  }

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
      return undefined;
    } else if ('InvalidAuth' in res) {
      return 'Authentication failed, please ensure that the address and password provided is correct.';
    } else if ('Failed' in res) {
      throw new Error(res.Failed);
    } else {
      never(res);
    }
  }

  async sendFunds(receiverId: string, amount: number) {
    const sessionData = this.sessionStore.getValue();
    const transaction = await this.enclaveService.createUnsignedTransaction({
      amount: amount * 100000,
      from: sessionData.walletId,
      to: receiverId,
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
  }
}
