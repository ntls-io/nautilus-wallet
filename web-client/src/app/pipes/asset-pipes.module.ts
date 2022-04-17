import { NgModule } from '@angular/core';
import { AssetAmountPipe } from 'src/app/pipes/asset-amount.pipe';
import { AssetSymbolPipe } from 'src/app/pipes/asset-symbol.pipe';

const declarations = [AssetAmountPipe, AssetSymbolPipe];

@NgModule({
  imports: [],
  declarations,
  exports: declarations,
})
export class AssetPipesModule {}
