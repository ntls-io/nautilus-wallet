import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RippleAPI, TransactionJSON } from 'ripple-lib';
import { tap } from 'rxjs/operators';
import { XrpFaucetQuery, XrpFaucetStore } from '.';

const ripple = new RippleAPI({
  server: 'wss://s.altnet.rippletest.net:51233/',
});

@Injectable({ providedIn: 'root' })
export class XrpFaucetService {
  constructor(
    private xrpFaucetStore: XrpFaucetStore,
    private xrpFaucetQuery: XrpFaucetQuery,
    private http: HttpClient
  ) {}

  async setAccount() {
    await this.http
      .post('https://faucet.altnet.rippletest.net/accounts', {})
      .pipe(tap((entities) => this.xrpFaucetStore.update(entities)))
      .toPromise();
  }

  async sendFunds(
    amount: number,
    destinationAddress: string,
    destinationTag?: number
  ) {
    this.xrpFaucetStore.setLoading(true);

    await this.setAccount();

    await ripple
      .connect()
      .then(async () => {
        let txJSON: TransactionJSON;

        try {
          const { validatedLedger } = await ripple.getServerInfo();
          const { account } = this.xrpFaucetQuery.getValue();

          txJSON = {
            Account: account.address,
            TransactionType: 'Payment',
            LastLedgerSequence: validatedLedger.ledgerVersion + 4,
            Destination: destinationAddress,
            Amount: ripple.xrpToDrops(amount),
          };

          if (destinationTag) {
            txJSON.DestinationTag = destinationTag;
          }

          try {
            const { signedTransaction } = await this.prepareTx(
              txJSON,
              account.secret
            );

            const { resultCode } = await ripple.submit(signedTransaction);

            if (resultCode === 'tesSUCCESS') {
              //TODO: do something on success
            }
          } catch (e) {
            console.log(e);
          }
        } catch (e) {
          console.log(e);
        }
      })
      .catch(console.error)
      .finally(async () => {
        this.xrpFaucetStore.setLoading(false);
        this.xrpFaucetStore.reset();
        await ripple.disconnect();
      });
  }

  async prepareTx(json: TransactionJSON, secret: string) {
    const { txJSON } = await ripple.prepareTransaction(json);

    return ripple.sign(txJSON, secret);
  }

  validateAddress(address: string) {
    return ripple.isValidAddress(address);
  }
}
