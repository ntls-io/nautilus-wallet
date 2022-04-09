import { Injectable } from '@angular/core';
import { Transaction } from 'algosdk';
import { AlgodService } from 'src/app/services/algod.service';
import {
  extractAlgorandAssetBalance,
  noBigintSupport,
  TransactionConfirmation,
} from 'src/app/services/algosdk.utils';
import { SessionStore } from 'src/app/stores/session';
import { defined, panic } from 'src/app/utils/errors/panic';
import { never } from 'src/helpers/helpers';
import { AlgorandTransactionSigned } from 'src/schema/entities';
import { EnclaveService } from '../enclave';

type MaybeError = string | undefined;

@Injectable({ providedIn: 'root' })
export class WalletService {
  constructor(
    private sessionStore: SessionStore,
    private enclaveService: EnclaveService,
    private algodService: AlgodService
  ) {}

  /**
   * Get the stored Algorand account address
   */
  storedAlgorandAddress(): string {
    // TODO(Pi): Use algorand_address_base32 here.
    const { walletId: algorandAddress } = this.sessionStore.getValue();
    return algorandAddress;
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

  async updateBalance() {
    const algorandAddress = this.storedAlgorandAddress();
    const algorandAccount = await this.algodService.getAccount(algorandAddress);
    const balance = noBigintSupport(algorandAccount.amount);
    this.sessionStore.update({ algorandAccount, balance });
  }

  async openWallet(walletId: string, pin: string): Promise<MaybeError> {
    const res = await this.enclaveService.openWallet({
      wallet_id: walletId,
      auth_pin: pin,
    });

    if ('Opened' in res) {
      const { owner_name: name } = res.Opened;
      this.sessionStore.update({ walletId, name, pin });
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
    const transaction = await this.algodService.createUnsignedTransaction({
      amount: amount * 100000,
      from: walletId,
      to: receiverId,
    });
    const res = await this.enclaveService.signTransaction({
      auth_pin: pin,
      wallet_id: walletId,
      algorand_transaction_bytes: transaction.bytesToSign(),
    });
    const submitRes = await this.algodService.submitAndConfirmTransaction(
      (res as { Signed: AlgorandTransactionSigned }).Signed
        .signed_transaction_bytes
    );
    this.sessionStore.update({ transactionId: submitRes.txId });
    await this.updateBalance();
  }

  /**
   * Get the current Algorand account's Algo balance.
   *
   * @throws Error if `sessionStore.algorandAccount` is not defined
   */
  storedAlgorandAlgoBalance(): number {
    const { algorandAccount } = this.sessionStore.getValue();
    return noBigintSupport(defined(algorandAccount).amount);
  }

  hasAlgorandAlgoBalance() {
    return 0 < this.storedAlgorandAlgoBalance();
  }

  /**
   * Get the current Algorand account's balance for the given ASA.
   *
   * @return 0 if a zero-balance asset holding exists (account is opted-in to the ASA)
   * @return null if no asset holding exists (account is not opted-in to the ASA)
   *
   * @throws Error if `sessionStore.algorandAccount` is not defined
   */
  storedAlgorandAssetBalance(assetId: number): null | number {
    const { algorandAccount } = this.sessionStore.getValue();
    return extractAlgorandAssetBalance(defined(algorandAccount), assetId);
  }

  hasAlgorandAssetBalance(assetId: number): boolean {
    return this.storedAlgorandAssetBalance(assetId) !== null;
  }

  async sendTransaction(
    transaction: Transaction
  ): Promise<TransactionConfirmation> {
    const { walletId, pin } = this.sessionStore.getValue();
    const signResult = await this.enclaveService.signTransaction({
      auth_pin: pin,
      wallet_id: walletId,
      algorand_transaction_bytes: transaction.bytesToSign(),
    });
    if ('Signed' in signResult) {
      console.log('sendTransaction: submitting and confirming');
      const confirmation = await this.algodService.submitAndConfirmTransaction(
        signResult.Signed.signed_transaction_bytes
      );
      console.log('sendTransaction: confirmed', { confirmation });
      await this.updateBalance();
      return confirmation;
    } else if ('InvalidAuth' in signResult) {
      this.sessionStore.setError({ signResult });
      throw panic('WalletService.sendTransaction: invalid auth', signResult);
    } else if ('Failed' in signResult) {
      this.sessionStore.setError({ signResult });
      throw panic(
        `WalletService.sendTransaction failed: ${signResult.Failed}`,
        signResult
      );
    } else {
      throw never(signResult);
    }
  }

  async sendAssetOptIn(assetId: number): Promise<TransactionConfirmation> {
    const transaction = await this.algodService.createUnsignedAssetOptInTxn(
      this.storedAlgorandAddress(),
      assetId
    );
    return await this.sendTransaction(transaction);
  }

  async sendAssetFunds(
    assetId: number,
    receiverId: string,
    amount: number
  ): Promise<TransactionConfirmation> {
    const transaction = await this.algodService.createUnsignedAssetTransferTxn({
      from: this.storedAlgorandAddress(),
      to: receiverId,
      amount,
      assetIndex: assetId,
    });
    return await this.sendTransaction(transaction);
  }
}
