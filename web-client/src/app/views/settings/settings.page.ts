import { Component, OnInit } from '@angular/core';
import { resetStores } from '@datorama/akita';
import { NavController } from '@ionic/angular';
import { ConnectorQuery } from 'src/app/state/connector';
import { SessionQuery } from 'src/app/state/session.query';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  constructor(
    private navController: NavController,
    public sessionQuery: SessionQuery,
    public connectorQuery: ConnectorQuery
  ) {}

  signOut() {
    resetStores({ exclude: ['connector'] });
    this.navController.navigateRoot('/');
  }

  ngOnInit() {}
}
