import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../modules/shared/shared.module';
import { AssetPipesModule } from '../../pipes/asset-pipes.module';
import { TriggersPageRoutingModule } from './triggers-routing.module';
import { TriggersPage } from './triggers.page';

@NgModule({
  declarations: [TriggersPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TriggersPageRoutingModule,
    SharedModule,
    AssetPipesModule,
  ],
})
export class TriggersPageModule {}
