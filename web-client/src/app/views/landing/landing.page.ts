import { Component, OnInit } from '@angular/core';
import { resetStores } from '@datorama/akita';
import { ModalController, ViewDidEnter } from '@ionic/angular';
import { SetupQuery } from 'src/app/state/setup';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit, ViewDidEnter {
  firebasestorage =
    'https://firebasestorage.googleapis.com/v0/b/wallet-setup.appspot.com/o';

  constructor(
    private modalCtrl: ModalController,
    public setupQuery: SetupQuery
  ) {
    checkResetStores();
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

    checkResetStores();
  }

  ionViewDidEnter() {
    checkResetStores();
  }
}

/**
 * Reset Akita state with {@link resetStores}, unless configured with {@link environment.persistAkitaState}.
 */
const checkResetStores: () => void = environment.persistAkitaState
  ? () => {}
  : () => resetStores();
