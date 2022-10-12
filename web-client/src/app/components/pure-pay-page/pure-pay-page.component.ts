import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import algosdk from 'algosdk';
import { Payment, PaymentOption } from 'src/app/components/pay/pay.component';
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

  @Input() receiverAddress?: string | null;

  @Input() algorandBalances?: AssetAmount[] | null;

  @Input() xrplBalances?: AssetAmount[] | null;

  /** XXX: Name prefixed with "flag" because the property name can't start with "on", for security reasons. */
  @Input() flagOnfidoCheckIsClear?: boolean | null;

  @Output() paymentSubmitted = new EventEmitter<Payment>();

  /** @see PayAmountFormComponent.autofocus */
  @Input() autofocus = true;

  paymentOptions?: PaymentOption[];

  assetConfigs = environment.assetConfigs;
  hideXrpBalance = environment.hideXrpBalance;

  constructor() {}

  get receiverAddressType(): AddressType | undefined {
    return this.receiverAddress ? addressType(this.receiverAddress) : undefined;
  }

  get hasAlgorandBalances(): boolean {
    return 0 < (this.algorandBalances ?? []).length;
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
    if (this.hideXrpBalance) {
      filteredPaymentOptions = this.paymentOptions?.filter(paymentOption => paymentOption.senderBalance.assetDisplay.assetSymbol !== 'XRP');
      this.paymentOptions = filteredPaymentOptions;
    };
  }

  private getPaymentOptions(): PaymentOption[] | undefined {
    const senderName = this.senderName;
    const receiverAddress = this.receiverAddress;
    if (senderName && receiverAddress) {
      if (this.receiverAddressType === 'Algorand' && this.algorandBalances) {
        return this.algorandBalances.map((senderBalance) => ({
          senderName,
          senderBalance,
          receiverAddress,
          ...this.transactionLimitFor(senderBalance),
        }));
      } else if (this.receiverAddressType === 'XRPL' && this.xrplBalances) {
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

type AddressType = 'Algorand' | 'XRPL';

const addressTypes = (address: string): AddressType[] => {
  const coerce = (t: AddressType[]) => t;
  return [
    ...coerce(algosdk.isValidAddress(address) ? ['Algorand'] : []),
    ...coerce(xrpl.isValidAddress(address) ? ['XRPL'] : []),
  ];
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
