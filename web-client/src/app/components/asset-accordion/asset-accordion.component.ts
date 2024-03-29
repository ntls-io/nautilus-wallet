import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SessionXrplService } from 'src/app/state/session-xrpl.service';
import { SetupQuery } from 'src/app/state/setup';
import { environment } from 'src/environments/environment';
import { IssuedCurrencyAmount } from 'xrpl/dist/npm/models/common';

@Component({
  selector: 'app-asset-accordion',
  templateUrl: './asset-accordion.component.html',
  styleUrls: ['./asset-accordion.component.scss'],
})
export class AssetAccordionComponent implements OnInit {
  @Output() refreshBalances = new EventEmitter<boolean>();
  isOpting = false;
  tokenSymbol = environment.tokenSymbol;

  constructor(
    private sessionXrplService: SessionXrplService,
    private setupQuery: SetupQuery
  ) {}

  ngOnInit() {}

  async optin(currency: string) {
    const issuer = this.setupQuery.tokenIssuer;

    const limitAmount: IssuedCurrencyAmount = {
      currency,
      issuer,
      value: '10000',
    };

    this.isOpting = true;
    await this.sessionXrplService
      .createTrustline(limitAmount, true)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.refreshBalances.emit(true);
        this.isOpting = false;
      });
  }
}
