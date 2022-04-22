import { Pipe, PipeTransform } from '@angular/core';
import { AssetAmount, formatAssetAmount } from 'src/app/utils/asset.display';

/** @see formatAssetAmount */
@Pipe({
  name: 'assetAmount',
  pure: true,
})
export class AssetAmountPipe implements PipeTransform {
  transform(assetAmount?: AssetAmount | null): string | null | undefined {
    return assetAmount ? formatAssetAmount(assetAmount) : assetAmount;
  }
}
