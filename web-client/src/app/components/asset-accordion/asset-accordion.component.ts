import { Component, OnInit } from '@angular/core';
import { SessionXrplService } from 'src/app/state/session-xrpl.service';
import { environment } from 'src/environments/environment';
import { IssuedCurrencyAmount } from 'xrpl/dist/npm/models/common';

@Component({
  selector: 'app-asset-accordion',
  templateUrl: './asset-accordion.component.html',
  styleUrls: ['./asset-accordion.component.scss'],
})
export class AssetAccordionComponent implements OnInit {
  isOpting = false;
  constructor(private sessionXrplService: SessionXrplService) {}

  ngOnInit() {}

  async optin(currency: string) {
    const limitAmount: IssuedCurrencyAmount = {
      currency,
      issuer: environment.tokenIssuer,
      value: '2',
    };

    this.isOpting = true;
    await this.sessionXrplService
      .createTrustline(limitAmount, false)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.isOpting = false;
      });
  }
}
