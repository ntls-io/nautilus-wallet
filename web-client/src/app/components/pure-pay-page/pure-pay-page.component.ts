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

  @Output() paymentSubmitted = new EventEmitter<Payment>();

  paymentOptions?: PaymentOption[];

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
        }));
      }
    }
  }
}

type AddressType = 'Algorand';

const addressTypes = (address: string): AddressType[] => {
  const coerce = (t: AddressType[]) => t;
  return [...coerce(algosdk.isValidAddress(address) ? ['Algorand'] : [])];
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
