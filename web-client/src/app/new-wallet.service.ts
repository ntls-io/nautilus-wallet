import { Injectable } from '@angular/core';
import { AlgorandTransactionSigned } from 'src/schema/entities';
import { WalletService } from './services/wallet.service';
import { WalletStore } from './wallet.store';

type MaybeError = string | undefined;
@Injectable({
  providedIn: 'root',
})
export class NewWalletService {
  constructor(
    private walletStore: WalletStore,
    private ntlsService: WalletService
  ) {}

  async clearError() {
    this.walletStore.setError(undefined);
  }

  async createWallet(name: string, pin: string) {
    try {
      const res = await this.ntlsService.createWallet({
        owner_name: name,
        auth_pin: pin,
      });

      if ('Created' in res) {
        const { wallet_id: walletId } = res.Created;
        this.walletStore.update({ walletId, name });
      } else if ('Failed' in res) {
        this.walletStore.setError(res);
      } else {
        never(res);
      }
    } catch (err) {
      this.walletStore.setError(err);
    }
  }

  async openWallet(walletId: string, pin: string): Promise<MaybeError> {
    const res = await this.ntlsService.openWallet({
      wallet_id: walletId,
      auth_pin: pin,
    });

    if ('Opened' in res) {
      const balance = (await this.ntlsService.getBalance(walletId)) / 100000;
      const { owner_name: name } = res.Opened;
      this.walletStore.update({ walletId, name, pin, balance });
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
    const sessionData = this.walletStore.getValue();
    const transaction = await this.ntlsService.createUnsignedTransaction({
      amount: amount * 100000,
      from: sessionData.walletId,
      to: receiverId,
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
