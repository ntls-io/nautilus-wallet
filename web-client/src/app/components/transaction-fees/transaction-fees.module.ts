import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AssetPipesModule } from 'src/app/pipes/asset-pipes.module';
import { TransactionFeePipe } from 'src/app/pipes/transaction-fee.pipe';
import { TransactionFeesComponent } from './transaction-fees.component';

@NgModule({
  imports: [CommonModule, IonicModule, AssetPipesModule],
  declarations: [TransactionFeesComponent, TransactionFeePipe],
  exports: [TransactionFeesComponent],
})
export class TransactionFeesComponentModule {}
