import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BalanceSummaryCardComponent } from './balance-summary-card.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [BalanceSummaryCardComponent],
  exports: [BalanceSummaryCardComponent],
})
export class BalanceSummaryCardComponentModule {}
