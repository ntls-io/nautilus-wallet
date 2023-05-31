import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ConnectorService } from 'src/app/state/connector';
import { SessionQuery } from 'src/app/state/session.query';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';

@Component({
  selector: 'app-become-connector',
  templateUrl: './become-connector.page.html',
  styleUrls: ['./become-connector.page.scss'],
})
export class BecomeConnectorPage implements OnInit {
  isConfirmed = false;

  constructor(
    private connectorService: ConnectorService,
    private notification: SwalHelper,
    private navCtrl: NavController,
    public sessionQuery: SessionQuery
  ) {}

  ngOnInit() {}

  optin(walletId: string) {
    this.connectorService.becomeConnector(walletId).finally(() => {
      this.notify();
    });
  }

  notify() {
    this.notification.swal
      .fire({
        icon: 'success',
        text: 'You have successfully become a connector.',
      })
      .then(() => {
        this.navCtrl.pop();
      });
  }
}
