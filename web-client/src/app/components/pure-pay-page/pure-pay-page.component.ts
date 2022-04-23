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
import { AccountData, convertToAlgos } from 'src/app/services/algosdk.utils';
import { assetAmountAlgo } from 'src/app/utils/assets/assets.algo';
import { WalletDisplay } from 'src/schema/entities';

/**
 * @see PayPage
 */
@Component({
  selector: 'app-pure-pay-page',
  templateUrl: './pure-pay-page.component.html',
  styleUrls: ['./pure-pay-page.component.scss'],
})
export class PurePayPageComponent implements OnInit, OnChanges {
  @Input() wallet?: WalletDisplay | null;

  @Input() receiverAddress?: string | null;

  @Input() algorandAccountData?: AccountData | null;

  @Output() paymentSubmitted = new EventEmitter<Payment>();

  paymentOptions?: PaymentOption[];

  constructor() {}

  get receiverAddressType(): AddressType | undefined {
    return this.receiverAddress ? addressType(this.receiverAddress) : undefined;
  }

  ngOnInit() {}

  /**
   * Recalculate {@link paymentOptions} on change.
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.paymentOptions = this.getPaymentOptions();
  }

  private getPaymentOptions(): PaymentOption[] | undefined {
    if (this.wallet && this.receiverAddress) {
      if (this.receiverAddressType === 'Algorand' && this.algorandAccountData) {
        const balanceInMicroAlgos = this.algorandAccountData.amount;
        const balanceInAlgo = convertToAlgos(balanceInMicroAlgos);
        return [
          {
            senderName: this.wallet.owner_name,
            senderBalance: assetAmountAlgo(balanceInAlgo),
            receiverAddress: this.receiverAddress,
          },
          // TODO: this.algorandAccountData.assets
        ];
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
