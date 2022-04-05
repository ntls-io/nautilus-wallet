import { Injectable } from '@angular/core';
import { bytesToHex, hexToBytes } from 'ripple-keypairs/dist/utils';
import { TransactionJSON } from 'ripple-lib';
import { XrplService } from 'src/app/services/xrpl/xrpl.service';
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
    private enclaveService: EnclaveService,
    private xrplService: XrplService
  ) {}

  async createWallet(name: string, pin: string) {
    const res = await this.enclaveService.createWallet({
      owner_name: name,
      auth_pin: pin,
    });

    if ('Created' in res) {
      const { wallet_id: walletId, xrp_account } = res.Created;
      this.sessionStore.update({ walletId, name, xrp_account });
    } else if ('Failed' in res) {
      throw panic('WalletService: createWallet failed', res);
    } else {
      never(res);
    }
  }

  async updateBalance() {
    const { walletId } = this.sessionStore.getValue();
    // prettier-ignore
    const balance =
      environment.ledger === 'Algorand' ? (await this.enclaveService.getBalance(walletId)) / 100000 :
      environment.ledger === 'XRP' ? parseInt(await this.xrplService.getBalance(walletId), 10) :
      never(environment.ledger);
    console.log(balance);
    this.sessionStore.update({ balance });
  }

  async openWallet(walletId: string, pin: string): Promise<MaybeError> {
    const res = await this.enclaveService.openWallet({
      wallet_id: walletId,
      auth_pin: pin,
    });

    if ('Opened' in res) {
      const { owner_name: name, xrp_account } = res.Opened;
      this.sessionStore.update({ walletId, name, pin, xrp_account });
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
    const [request, extra] = await this.constructSignTransactionRequest(
      receiverId,
      amount
    );
    const result = await this.enclaveService.signTransaction(request);
    const transactionId = await this.submitSignTransactionResult(result, extra);
    this.sessionStore.update({ transactionId });
    await this.updateBalance();
  }

  /** Helper: Construct appropriate `SignTransaction` request. */
  private async constructSignTransactionRequest(
    receiverId: string,
    amount: number
  ): Promise<[SignTransaction, TransactionJSON?]> {
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

    // XXX: Return txJSON alongside the bytes, for later use.
    const xrp_bytes = async (): Promise<
      [
        Required<Pick<SignTransaction, 'xrp_transaction_bytes'>>,
        TransactionJSON
      ]
    > => {
      const getPublicKey = (): string => {
        const { xrp_account } = this.sessionStore.getValue();
        if (xrp_account) {
          return xrp_account.public_key_hex;
        } else {
          throw panic(
            'WalletService.constructSignTransactionRequest: xrp_account state missing',
            xrp_account
          );
        }
      };

      const { encoded, txJSON } =
        await this.xrplService.createUnsignedTransaction(
          walletId,
          receiverId,
          amount.toString(),
          getPublicKey()
        );
      const xrp_transaction_bytes = Uint8Array.from(hexToBytes(encoded));

      return [{ xrp_transaction_bytes }, txJSON];
    };

    // prettier-ignore
    const [transaction_bytes, extra] =
      environment.ledger === 'Algorand' ? [await algorand_bytes(), undefined] :
      environment.ledger === 'XRP' ? await xrp_bytes() :
      never(environment.ledger);

    return [
      {
        auth_pin: pin,
        wallet_id: walletId,
        ...transaction_bytes,
      },
      extra,
    ];
  }

  /** Helper: Submit and confirm a signed transaction to the ledger. */
  private async submitSignTransactionResult(
    result: SignTransactionResult,
    txJSON?: TransactionJSON
  ): Promise<string> {
    if (environment.ledger === 'Algorand' && 'Signed' in result) {
      const { signed_transaction_bytes } = result.Signed;
      const confirmation =
        await this.enclaveService.submitAndConfirmTransaction(
          signed_transaction_bytes
        );
      return confirmation.txId;
    } else if (environment.ledger === 'XRP' && 'SignedXrp' in result) {
      if (txJSON) {
        const { signed_transaction_bytes, signature_bytes } = result.SignedXrp;
        const signature_hex = bytesToHex(signature_bytes);
        // TODO(Pi): Pass signed_transaction_bytes here instead of txJSON?
        const response = await this.xrplService.submitTransaction(
          txJSON,
          signature_hex
        );
        const transactionId = (response as any)?.tx_json?.hash;
        if (transactionId && typeof transactionId == 'string') {
          return transactionId;
        } else {
          throw panic(
            'WalletService.submitTransaction: expected response.hash',
            { response }
          );
        }
      } else {
        throw panic(
          'WalletService.submitAndConfirmTransaction: expected txJSON',
          { result, txJSON }
        );
      }
    } else {
      throw panic(
        'WalletService.handleSignTransactionResult: got unexpected result',
        result
      );
    }
  }
}
