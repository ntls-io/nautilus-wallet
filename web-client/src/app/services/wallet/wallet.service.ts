import { Injectable } from '@angular/core';
import { SessionStore } from 'src/app/stores/session';
import { AlgorandTransactionSigned } from 'src/schema/entities';
import { EnclaveService } from '../enclave';
import { WalletStore } from './wallet.store';

@Injectable({ providedIn: 'root' })
export class WalletService {
  constructor(
    private walletStore: WalletStore,
    private sessionStore: SessionStore,
    private enclaveService: EnclaveService
  ) {}

  async createWallet(name: string, pin: string) {
    try {
      const res = await this.enclaveService.createWallet({
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
  async updateBalance() {
    const { walletId } = this.sessionStore.getValue();
    const balance = (await this.enclaveService.getBalance(walletId)) / 100000;
    console.log(balance);
    this.sessionStore.update({ balance });
  }

  async openWallet(walletId: string, pin: string): Promise<MaybeError> {
    const res = await this.enclaveService.openWallet({
      wallet_id: walletId,
      auth_pin: pin,
    });

    if ('Opened' in res) {
      const { owner_name: name } = res.Opened;
      this.walletStore.update({ walletId, name, pin });
      await this.updateBalance();
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

  async sendFunds(receiverId: string, amount: number) {
    const { walletId, pin } = this.sessionStore.getValue();
    const transaction = await this.enclaveService.createUnsignedTransaction({
      amount: amount * 100000,
      from: walletId,
      to: receiverId,
    });
    const res = await this.enclaveService.signTransaction({
      auth_pin: pin,
      wallet_id: walletId,
      algorand_transaction_bytes: transaction.bytesToSign(),
    });
    const submitRes = await this.enclaveService.submitAndConfirmTransaction(
      (res as { Signed: AlgorandTransactionSigned }).Signed
        .signed_transaction_bytes
    );
    this.walletStore.update({ transactionId: submitRes.txId });
    await this.updateBalance();
  }
}
