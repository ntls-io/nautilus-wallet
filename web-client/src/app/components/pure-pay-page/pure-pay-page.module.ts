import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PurePayPageComponent } from './pure-pay-page.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [PurePayPageComponent],
  exports: [PurePayPageComponent],
})
export class PurePayPageComponentModule {}
