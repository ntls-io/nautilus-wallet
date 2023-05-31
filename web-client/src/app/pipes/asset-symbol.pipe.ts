import { Pipe, PipeTransform } from '@angular/core';
import {
  AssetAmount,
  formatAssetSymbol,
} from 'src/app/utils/assets/assets.common';

/** @see formatAssetSymbol */
@Pipe({
  name: 'assetSymbol',
  pure: true,
})
export class AssetSymbolPipe implements PipeTransform {
  transform(assetAmount?: AssetAmount | null): string | null | undefined {
    return assetAmount ? formatAssetSymbol(assetAmount) : assetAmount;
  }
}
