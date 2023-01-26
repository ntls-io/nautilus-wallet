import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { map } from 'rxjs';
import { Payment, PaymentOption } from 'src/app/components/pay/pay.component';
import { SessionQuery } from 'src/app/state/session.query';
import { AssetAmount } from 'src/app/utils/assets/assets.common';
import { getAssetConfigForLedgerInfo } from 'src/app/utils/assets/assets.config';
import { environment } from 'src/environments/environment';
import { ifDefined } from 'src/helpers/helpers';
import * as xrpl from 'xrpl';

/**
 * @see PayPage
 */
@Component({
  selector: 'app-pure-pay-page',
  templateUrl: './pure-pay-page.component.html',
  styleUrls: ['./pure-pay-page.component.scss'],
})
export class PurePayPageComponent implements OnInit, OnChanges {
  @Input() senderName?: string | null;

  @Input() senderAddress?: string | null;

  @Input() receiverAddress?: string | null;

  @Input() xrplBalances?: AssetAmount[] | null;

  /** XXX: Name prefixed with "flag" because the property name can't start with "on", for security reasons. */
  @Input() flagOnfidoCheckIsClear?: boolean | null;

  @Output() paymentSubmitted = new EventEmitter<Payment>();

  /** @see PayAmountFormComponent.autofocus */
  @Input() autofocus = true;

  paymentOptions?: PaymentOption[];

  assetConfigs = environment.assetConfigs;

  availableAccounts?: number;

  constructor(public sessionQuery: SessionQuery) {
    let balances = sessionQuery.allBalances;
    if (environment.hideXrpBalance) {
      balances = balances.pipe(
        map((balance) =>
          balance.filter(
            (currency) => currency.assetDisplay.assetSymbol !== 'XRP'
          )
        )
      );
    }
    balances.subscribe((balance) => (this.availableAccounts = balance.length));
  }

  get receiverAddressType(): AddressType | undefined {
    return this.receiverAddress ? addressType(this.receiverAddress) : undefined;
  }

  get hasPaymentOptions(): boolean {
    return 0 < (this.paymentOptions ?? []).length;
  }

  ngOnInit() {}

  /**
   * Recalculate {@link paymentOptions} on change.
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.paymentOptions = this.getPaymentOptions();
    let filteredPaymentOptions: PaymentOption[] | undefined;
    if (environment.hideXrpBalance) {
      filteredPaymentOptions = this.paymentOptions?.filter(
        (paymentOption) =>
          paymentOption.senderBalance.assetDisplay.assetSymbol !== 'XRP'
      );
      this.paymentOptions = filteredPaymentOptions;
    }
  }

  private getPaymentOptions(): PaymentOption[] | undefined {
    const senderName = this.senderName;
    const receiverAddress = this.receiverAddress;
    if (senderName && receiverAddress) {
      if (this.receiverAddressType === 'XRPL' && this.xrplBalances) {
        return this.xrplBalances.map((senderBalance) => ({
          senderName,
          senderBalance,
          receiverAddress,
          ...this.transactionLimitFor(senderBalance),
        }));
      }
    }
  }

  /**
   * Determine the transaction limit to use for the given sender balance.
   *
   * This applies `transactionLimitWithoutOnfidoCheck` configurations based on {@link flagOnfidoCheckIsClear}.
   */
  private transactionLimitFor(
    senderBalance: AssetAmount
  ): Pick<PaymentOption, 'transactionLimit'> {
    const transactionLimit = this.flagOnfidoCheckIsClear
      ? undefined
      : ifDefined(
          this.assetConfigs,
          (assetConfigs) =>
            getAssetConfigForLedgerInfo(assetConfigs, senderBalance.ledgerInfo)
              ?.transactionLimitWithoutOnfidoCheck
        );
    return transactionLimit === undefined ? {} : { transactionLimit };
  }
}

type AddressType = 'XRPL';

const addressTypes = (address: string): AddressType[] => {
  const coerce = (t: AddressType[]) => t;
  return [...coerce(xrpl.isValidAddress(address) ? ['XRPL'] : [])];
};

const addressType = (address: string): AddressType | undefined => {
  const types = addressTypes(address);
  switch (types.length) {
    case 0:
      return undefined;
    case 1:
      return types[0];
    default:
      throw Error(
        `addressType: ${JSON.stringify(
          types
        )} has multiple types: ${JSON.stringify(types)}`
      );
  }
};
