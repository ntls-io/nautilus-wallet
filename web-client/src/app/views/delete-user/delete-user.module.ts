import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { PurePayPageComponent } from '../../components/pure-pay-page/pure-pay-page.component';
import { DeleteUserService } from '../../services/delete-user.service';
import { DeleteUserPageRoutingModule } from './delete-user-routing.module';
import { DeleteUserPage } from './delete-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeleteUserPageRoutingModule,
    FormsModule,
    SharedModule,
  ],
  declarations: [DeleteUserPage],
  providers: [DeleteUserService, PurePayPageComponent],
})
export class DeleteUserPageModule {}
