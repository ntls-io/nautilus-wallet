import { Pipe, PipeTransform } from '@angular/core';
import { ConnectorQuery } from '../state/connector';
import { AssetAmount, getAssetCommission } from '../utils/assets/assets.common';

@Pipe({
  name: 'transactionFee',
})
export class TransactionFeePipe implements PipeTransform {
  constructor(private connectorQuery: ConnectorQuery) {}

  transform(
    assetAmount: AssetAmount | undefined,
    isTotal?: boolean
  ): AssetAmount | undefined {
    if (assetAmount) {
      const isConnector = !!this.connectorQuery.getValue().walletId;
      const assetTransactedFee = getAssetCommission(assetAmount, isConnector);

      const total = { ...assetAmount };
      if (isTotal) {
        total.amount = assetAmount.amount - assetTransactedFee.amount;
      }

      return isTotal ? total : assetTransactedFee;
    }

    return undefined;
  }
}
