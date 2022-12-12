import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import { SessionService } from 'src/app/state/session.service';
import { StartSgxSession } from 'src/schema/session';
import { SgxSession } from 'src/schema/session';

@Component({
  selector: 'app-pin-reset',
  templateUrl: './pin-reset.page.html',
  styleUrls: ['./pin-reset.page.scss'],
})
export class PinResetPage implements OnInit {
async onSubmit(answers: Map<string, string>) {
  console.log(answers);
  const wallet_id = 'rwZNkxoLwpWkGhPtqCFCki9YUeySMnLwes';
  const newSession = StartSgxSession.new(wallet_id);
  console.log(newSession.our_public_key);
  const client_pk = newSession.our_public_key();
  console.log(client_pk);
  const server_pk = this.sessionService.startPinReset(wallet_id,answers,new Uint8Array(1));
  //const server_pk = true;
  console.log(server_pk);

  /**
  if (await server_pk) {
    this.notification.swal.fire({
      icon: 'warning',
      title: 'Incorrect PIN',
      text: 'Authentication failed, please ensure that the answers to the security questions are correct.',
    });
  }
  this.navCtrl.navigateRoot('/');
 */


  //this.sessionService.pinReset();
}

  // client_pk is missing.
  //server_pk = this.sessionService.startPinReset();
  //session = this.newSession.start_session();
  constructor(
    private modalCtrl: ModalController,
    public sessionService: SessionService,
    private notification: SwalHelper,
    private navCtrl: NavController) {
    }

  ngOnInit() {}
  //server_pk = this.sessionService.startPinReset();

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
