import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-manual-address',
  templateUrl: './manual-address.page.html',
  styleUrls: ['./manual-address.page.scss'],
})
export class ManualAddressPage implements OnInit {
  address: string | undefined;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  dismiss(success: boolean, address?: string) {
    this.modalCtrl.dismiss({
      success,
      address,
    });
  }

  confirm() {
    this.dismiss(true, this.address);
  }
}
