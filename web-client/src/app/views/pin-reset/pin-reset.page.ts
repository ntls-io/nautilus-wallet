import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SessionService } from 'src/app/state/session.service';
import { StartSgxSession } from 'src/schema/session';
import { SgxSession } from 'src/schema/session';

@Component({
  selector: 'app-pin-reset',
  templateUrl: './pin-reset.page.html',
  styleUrls: ['./pin-reset.page.scss'],
})
export class PinResetPage implements OnInit {

  wallet_id = '';
  newSession = StartSgxSession.new(this.wallet_id);
  // client_pk is missing.
  server_pk = this.sessionService.startPinReset();
  session = this.newSession.start_session();
  constructor(
    private modalCtrl: ModalController,
    public sessionService: SessionService) {
    }

  ngOnInit() {}
  server_pk = this.sessionService.startPinReset();

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
