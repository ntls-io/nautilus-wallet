import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RippleAPI } from 'ripple-lib';
import { tap } from 'rxjs/operators';
import { XrpFaucetStore } from './xrp-faucet.store';

const ripple = new RippleAPI({
  server: '', //TODO: set server address
});

@Injectable({ providedIn: 'root' })
export class XrpFaucetService {
  constructor(
    private xrpFaucetStore: XrpFaucetStore,
    private http: HttpClient
  ) {}

  async setAccount() {
    this.xrpFaucetStore.setLoading(true);

    await this.http
      .post('https://faucet.altnet.rippletest.net/accounts', {})
      .pipe(tap((entities) => this.xrpFaucetStore.update(entities)))
      .toPromise();

    this.xrpFaucetStore.setLoading(false);
  }

  async sendFunds(
    fromAddress: string,
    toAddress: string,
    amount: number,
    destinationTag?: number
  ) {
    const { validatedLedger } = await ripple.getServerInfo();

    const txJSON = {
      Account: fromAddress,
      TransactionType: 'Payment',
      LastLedgerSequence: validatedLedger.ledgerVersion + 4, // not sure of this
      Destination: toAddress,
      Amount: ripple.xrpToDrops(amount),
      DestinationTag: destinationTag,
    };

    if (!destinationTag) {
      delete txJSON.DestinationTag;
    }

    await ripple.prepareTransaction(txJSON);
    //TODO: send or sign transaction
    //
  }

  validateAddress(address: string) {
    return ripple.isValidAddress(address);
  }
}
