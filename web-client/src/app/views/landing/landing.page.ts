import { Component, OnInit } from '@angular/core';
import { resetStores } from '@datorama/akita';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  constructor(private modalCtrl: ModalController) {
    resetStores();
  }

  async ngOnInit() {
    // XXX: Modal closing code from GlobalErrorHandler
    const topModal = await this.modalCtrl.getTop();
    if (topModal) {
      console.log(
        'LandingPage: found stray top modal, attempting to dismiss:',
        topModal
      );
      await this.modalCtrl.dismiss();
    }

    resetStores();
  }

  ionViewDidEnter() {
    resetStores();
  }
}
