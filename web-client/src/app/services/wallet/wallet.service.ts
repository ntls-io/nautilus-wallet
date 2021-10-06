import { Injectable } from '@angular/core';
import { SessionStore } from 'src/app/stores/session';
import { panic } from 'src/app/utils/errors/panic';
import { environment } from 'src/environments/environment.prod';
import { never } from 'src/helpers/helpers';
import { SignTransaction, SignTransactionResult } from 'src/schema/actions';
import { EnclaveService } from '../enclave';

type MaybeError = string | undefined;

@Injectable({ providedIn: 'root' })
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
    const request = await this.constructSignTransactionRequest(
      receiverId,
      amount
    );
    const result = await this.enclaveService.signTransaction(request);
    const transactionId = await this.submitSignTransactionResult(result);
    this.sessionStore.update({ transactionId });
    await this.updateBalance();
  }

  /** Helper: Construct appropriate `SignTransaction` request. */
  private async constructSignTransactionRequest(
    receiverId: string,
    amount: number
  ): Promise<SignTransaction> {
    const { walletId, pin } = this.sessionStore.getValue();

    const algorand_bytes = async (): Promise<
      Required<Pick<SignTransaction, 'algorand_transaction_bytes'>>
    > => ({
      algorand_transaction_bytes: (
        await this.enclaveService.createUnsignedTransaction({
          amount: amount * 100000,
          from: walletId,
          to: receiverId,
        })
      ).bytesToSign(),
    });

    const xrp_bytes = async (): Promise<
      Required<Pick<SignTransaction, 'xrp_transaction_bytes'>>
    > => ({
      xrp_transaction_bytes: new Uint8Array(), // TODO: XRP
    });

    // prettier-ignore
    const transaction_bytes =
      environment.ledger === 'Algorand' ? await algorand_bytes() :
      environment.ledger === 'XRP' ? await xrp_bytes() :
      never(environment.ledger);

    return {
      auth_pin: pin,
      wallet_id: walletId,
      ...transaction_bytes,
    };
  }

  /** Helper: Submit and confirm a signed transaction to the ledger. */
  private async submitSignTransactionResult(
    result: SignTransactionResult
  ): Promise<string> {
    if (environment.ledger === 'Algorand' && 'Signed' in result) {
      const { signed_transaction_bytes } = result.Signed;
      const confirmation =
        await this.enclaveService.submitAndConfirmTransaction(
          signed_transaction_bytes
        );
      return confirmation.txId;
    } else if (environment.ledger === 'XRP' && 'SignedXrp' in result) {
      const { signed_transaction_bytes, signature_bytes } = result.SignedXrp;
      return 'TODO'; // TODO: XRP
    } else {
      throw panic(
        'WalletService.handleSignTransactionResult: got unexpected result',
        result
      );
    }
  }
}
