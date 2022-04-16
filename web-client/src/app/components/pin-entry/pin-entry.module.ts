import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PinEntryComponent } from './pin-entry.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
  declarations: [PinEntryComponent],
  exports: [PinEntryComponent],
})
export class PinEntryComponentModule {}
