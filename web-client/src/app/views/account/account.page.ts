import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Account, AccountQuery } from 'src/app/stores/account';
import { ReceivePage } from '../receive/receive.page';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  account: Account | undefined;

  constructor(
    private accountQuery: AccountQuery,
    private modalCtrl: ModalController,
    private navCtrl: NavController
  ) {
    this.accountQuery
      .selectActive()
      .subscribe((account) => (this.account = account));
  }

  ngOnInit() {}

  async showAddress() {
    const modal = await this.modalCtrl.create({
      component: ReceivePage,
      componentProps: { account: this.account },
    });
    return await modal.present();
  }

  async payToAddress() {
    await this.navCtrl.navigateForward('send-funds');
  }
}
