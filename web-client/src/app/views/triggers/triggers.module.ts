import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TriggersPageRoutingModule } from './triggers-routing.module';

import { TriggersPage } from './triggers.page';
import { SharedModule } from '../../modules/shared/shared.module';
import { AssetPipesModule } from '../../pipes/asset-pipes.module';

@NgModule({
    declarations: [TriggersPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TriggersPageRoutingModule,
        SharedModule,
        AssetPipesModule
    ]
})
export class TriggersPageModule {}
