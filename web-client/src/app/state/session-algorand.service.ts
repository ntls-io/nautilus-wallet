import { Injectable } from '@angular/core';
import { Transaction } from 'algosdk';
import { AlgodService } from 'src/app/services/algod.service';
import {
  Algos,
  convertToMicroAlgos,
  TransactionConfirmation,
} from 'src/app/services/algosdk.utils';
import { EnclaveService } from 'src/app/services/enclave/index';
import { panic } from 'src/app/utils/errors/panic';
import { never } from 'src/helpers/helpers';
import { SignTransactionResult, TransactionSigned } from 'src/schema/actions';
import { SessionQuery } from './session.query';
import { SessionStore } from './session.store';

/**
 * This service manages session state and operations related to the Algorand ledger.
 */
@Injectable({ providedIn: 'root' })
export class SessionAlgorandService {
  constructor(
    private sessionStore: SessionStore,
    private sessionQuery: SessionQuery,
    private enclaveService: EnclaveService,
    private algodService: AlgodService
  ) {}

  /**
   * Load the current wallet's Algorand account status from {@link AlgodService}.
   *
   * This updates {@link SessionState#algorandAccountData}.
   */
  async loadAccountData(): Promise<void> {
    const { wallet } = this.sessionQuery.assumeActiveSession();
    const algorandAccountData = await this.algodService.getAccountData(
      wallet.algorand_address_base32
    );
    this.sessionStore.update({ algorandAccountData });
  }

  /**
   * Send Algos to another account.
   */
  async sendAlgos(
    receiverId: string,
    amountInAlgos: Algos
  ): Promise<TransactionConfirmation> {
    const { wallet } = this.sessionQuery.assumeActiveSession();

    const amountInMicroAlgos = convertToMicroAlgos(amountInAlgos);
    const transaction = await this.algodService.createUnsignedTransaction({
      amount: amountInMicroAlgos,
      from: wallet.algorand_address_base32,
      to: receiverId,
    });
    return await this.sendTransaction(transaction);
  }

  /**
   * Helper: Sign, submit, and confirm the given transaction.
   */
  protected async sendTransaction(
    transaction: Transaction
  ): Promise<TransactionConfirmation> {
    const { wallet, pin } = this.sessionQuery.assumeActiveSession();

    const signResult: SignTransactionResult =
      await this.enclaveService.signTransaction({
        auth_pin: pin,
        wallet_id: wallet.wallet_id,
        transaction_to_sign: {
          AlgorandTransaction: { transaction_bytes: transaction.bytesToSign() },
        },
      });
    if ('Signed' in signResult) {
      const signed: TransactionSigned = signResult.Signed;
      if ('AlgorandTransactionSigned' in signed) {
        console.log('sendTransaction: submitting and confirming:', { signed });
        const { signed_transaction_bytes } = signed.AlgorandTransactionSigned;
        const confirmation =
          await this.algodService.submitAndConfirmTransaction(
            signed_transaction_bytes
          );
        console.log('sendTransaction: confirmed', { confirmation });
        await this.loadAccountData(); // FIXME(Pi): Move to caller?
        return confirmation;
      } else {
        throw panic(
          'SessionAlgorandService.sendTransaction: expected AlgorandTransactionSigned, got:',
          signed
        );
      }
    } else if ('InvalidAuth' in signResult) {
      this.sessionStore.setError({ signResult });
      throw panic(
        'SessionAlgorandService.sendTransaction: invalid auth',
        signResult
      );
    } else if ('Failed' in signResult) {
      this.sessionStore.setError({ signResult });
      throw panic(
        `SessionAlgorandService.sendTransaction failed: ${signResult.Failed}`,
        signResult
      );
    } else {
      throw never(signResult);
    }
  }
}
