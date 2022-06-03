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

      if (isTotal) {
        //TODO: check if we add or subtract fee to/from total (Jonathan)
        assetAmount.amount = assetAmount.amount - assetTransactedFee.amount;
      }

      return isTotal ? assetAmount : assetTransactedFee;
    }

    return undefined;
  }
}
