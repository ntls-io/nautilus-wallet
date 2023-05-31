import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PayFromToComponent } from 'src/app/components/pay-from-to/pay-from-to.component';
import { AssetPipesModule } from 'src/app/pipes/asset-pipes.module';

@NgModule({
  imports: [CommonModule, IonicModule, AssetPipesModule],
  declarations: [PayFromToComponent],
  exports: [PayFromToComponent],
})
export class PayFromToModule {}
