import { Pipe, PipeTransform } from '@angular/core';
import { AssetAmount, getAssetCommission } from '../utils/assets/assets.common';

@Pipe({
  name: 'transactionFee',
})
export class TransactionFeePipe implements PipeTransform {
  transform(
    assetAmount: AssetAmount | undefined,
    isTotal?: boolean
  ): AssetAmount | undefined {
    if (assetAmount) {
      const assetTransactedFee = getAssetCommission(assetAmount);

      const total = { ...assetAmount };
      if (isTotal) {
        total.amount = +assetAmount.amount + assetTransactedFee.amount;
      }

      return isTotal ? total : assetTransactedFee;
    }

    return undefined;
  }
}
