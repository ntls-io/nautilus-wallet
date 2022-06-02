import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ConnectorService } from 'src/app/state/connector';
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
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  optin() {
    this.connectorService.becomeConnector(true).finally(() => {
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
