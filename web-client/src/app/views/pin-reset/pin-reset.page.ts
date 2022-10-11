import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pin-reset',
  templateUrl: './pin-reset.page.html',
  styleUrls: ['./pin-reset.page.scss'],
})
export class PinResetPage implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
