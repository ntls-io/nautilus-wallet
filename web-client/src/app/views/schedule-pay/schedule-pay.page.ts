import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { firstValueFrom, map } from 'rxjs';
import { ScheduleValue } from 'src/app/components/new-schedule-pay/new-schedule-pay.component';
import { OtpPromptService } from 'src/app/services/otp-prompt.service';
import { BookmarkQuery } from 'src/app/state/bookmark';
import { RecurringPayService } from 'src/app/state/recurring-pay';
import { SessionQuery } from 'src/app/state/session.query';
import { SessionService } from 'src/app/state/session.service';
import {
  AssetAmount,
  assetAmountFromBase,
} from 'src/app/utils/assets/assets.common';
import {
  assetAmountXrp,
  AssetAmountXrp,
} from 'src/app/utils/assets/assets.xrp';
import {
  assetAmountXrplToken,
  AssetAmountXrplToken,
} from 'src/app/utils/assets/assets.xrp.token';
import { withLoadingOverlayOpts } from 'src/app/utils/loading.helpers';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import { environment } from 'src/environments/environment';

@UntilDestroy()
@Component({
  selector: 'app-schedule-pay',
  templateUrl: './schedule-pay.page.html',
  styleUrls: ['./schedule-pay.page.scss'],
})
export class SchedulePayPage implements OnInit {
  isScheduleEntryOpen = false;
  receiverAddress = '';
  senderName: string | undefined;
  selectedCurrency = environment.hideXrpBalance
    ? environment.tokenSymbol
    : 'XRP';

  tokenSymbol = environment.tokenSymbol;
  availableAccounts?: number;
  amount: AssetAmountXrp | AssetAmountXrplToken | undefined;

  balances = environment.hideXrpBalance
    ? this.sessionQuery.xrplBalances.pipe(
        map((balance) =>
          balance?.filter(
            (currency) => currency.assetDisplay.assetSymbol !== 'XRP'
          )
        )
      )
    : this.sessionQuery.xrplBalances;
  balance: AssetAmount | undefined;
  maxAmount = 1000000000;
  wallet_id: string | undefined;
  daysInMonth: number[] = [-1, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private bookmarkQuery: BookmarkQuery,
    private recurringPayService: RecurringPayService,
    public sessionQuery: SessionQuery,
    private otpPromptService: OtpPromptService,
    private notification: SwalHelper,
    private sessionService: SessionService
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state?.address) {
      this.receiverAddress = state.address;
      const senderBookmark = this.bookmarkQuery.getAll({
        filterBy: (bookmark) => bookmark.address === state.address,
      });

      this.senderName = senderBookmark[0]?.name;
    } else {
      this.navCtrl.pop();
    }
    this.balances
      .pipe(untilDestroyed(this))
      .subscribe((balance) => (this.availableAccounts = balance?.length));
  }

  async getXrplBalance(currency: string): Promise<AssetAmount | undefined> {
    const xrplBalances = await firstValueFrom(this.sessionQuery.xrplBalances);
    const balance = xrplBalances?.find(
      ({ assetDisplay }) => assetDisplay.assetSymbol === currency
    );
    return balance;
  }

  ngOnInit() {}

  setCurrency(event: any) {
    const { value } = event.target;
    this.setBalanceLimit(value);
    this.selectedCurrency = value;
  }

  async setBalanceLimit(currency: string) {
    const balance = await this.getXrplBalance(currency);

    if (balance) {
      this.balance = assetAmountFromBase(this.maxAmount, balance);
    }
  }

  async onAmountSubmitted(amount: number): Promise<void> {
    if (this.selectedCurrency === 'XRP') {
      this.amount = assetAmountXrp(amount);
    } else {
      const currency = environment.tokenSymbol;
      const issuer = environment.tokenIssuer;
      this.amount = assetAmountXrplToken(amount, { currency, issuer });
    }
    this.isScheduleEntryOpen = true;
  }

  isLeapYear(year: number): boolean {
    // year -> 1 if leap year, else 0.
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }

  getDateToOrdinal(date: Date): number {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return (
      (year - 1) * 365 +
      Math.floor((year - 1) / 4) -
      Math.floor((year - 1) / 100) +
      Math.floor((year - 1) / 400) +
      this.daysInMonth.slice(1, month).reduce((acc, curr) => acc + curr, 0) +
      (month > 2 && this.isLeapYear(year) ? 1 : 0) +
      day
    );
  }

  async onScheduleConfirmed(schedule: ScheduleValue) {
    this.wallet_id = this.sessionQuery.getValue().wallet?.wallet_id;
    if (this.wallet_id) {
      const wallet_public_key =
        await this.sessionService.getXrplWalletPublicKey(this.wallet_id);
      const otpAttempt = await this.otpPromptService.requestOTP();
      if (!otpAttempt) {
        return;
      }
      await withLoadingOverlayOpts(
        this.loadingCtrl,
        { message: 'Checking OTP...' },
        async () => {
          const otpResult = await this.otpPromptService.checkOtp(otpAttempt);
          if (otpResult.status === 200) {
            if (otpResult.data.status === 'approved') {
              await withLoadingOverlayOpts(
                this.loadingCtrl,
                { message: 'Creating Recurring Payment Schedule...' },
                async () => {
                  await this.recurringPayService.createRecurringPayment({
                    wallet_id: this.wallet_id ?? '',
                    wallet_public_key,
                    recipient: this.receiverAddress,
                    amount: this.amount?.amount ?? 0,
                    currency_code: this.selectedCurrency,
                    payment_start_date: this.getDateToOrdinal(
                      new Date(schedule.startDate)
                    ),
                    frequency: schedule.frequency,
                    payment_end_date: this.getDateToOrdinal(
                      new Date(schedule.endDate)
                    ),
                  });
                  await this.notification.showRecurringPaySuccessNotification();
                  this.navCtrl.back();
                }
              );
            } else if (otpResult.data.status === 'pending') {
              this.notification.showIncorrectOTPWarning();
            }
          } else {
            this.notification.showUnexpectedFailureWarning();
          }
        }
      );
    }
  }
}
