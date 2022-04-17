import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PayFromToComponent } from 'src/app/components/pay-from-to/pay-from-to.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [PayFromToComponent],
  exports: [PayFromToComponent],
})
export class PayFromToModule {}
