import { Component, Input, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { combineLatest, map, Observable } from 'rxjs';
import { SessionQuery } from 'src/app/state/session.query';
import { environment } from 'src/environments/environment';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  /** (Optional) Hook to override environment setting, if given. */
  @Input() requireKycBeforeSendPayment =
    environment?.requireOnfidoCheckBeforeSendPayment;

  organization = environment.organization;

  /**
   * Enable the "Send Money" action if both:
   * - KYC status is either cleared or not required
   * - At least one balance is available
   */
  actionSendMoneyEnabled: Observable<boolean> = combineLatest(
    this.sessionQuery.onfidoCheckIsClear,
    this.sessionQuery.allBalances
  ).pipe(
    map(
      ([onfidoCheckIsClear, assetAmounts]) =>
        (onfidoCheckIsClear || !this.requireKycBeforeSendPayment) &&
        assetAmounts.length > 0
    )
  );

  /** Show the "Verify Profile" if KYC status is not cleared. */
  actionVerifyProfileShown: Observable<boolean> =
    this.sessionQuery.onfidoCheckIsClear.pipe(
      map((onfidoCheckIsClear: boolean) => !onfidoCheckIsClear)
    );

  actionItems = [
    {
      title: 'Send Money',
      icon: 'card',
      path: '/wallet/send-funds',
      disabled: false,
    },
    {
      title: 'Receive',
      icon: 'download',
      path: '/wallet/receive',
      disabled: false,
    },
    {
      title: 'Transactions History',
      icon: 'list',
      path: '/history',
      disabled: false,
    },
  ];

  constructor(public sessionQuery: SessionQuery) {}

  ngOnInit() {}
}
