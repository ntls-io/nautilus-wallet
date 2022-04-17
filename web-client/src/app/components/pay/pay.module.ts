import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PayComponent } from './pay.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [PayComponent],
  exports: [PayComponent],
})
export class PayComponentModule {}
