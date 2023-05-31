import { Component, OnInit } from '@angular/core';
import { ConnectorQuery } from 'src/app/state/connector';
import { SessionQuery } from 'src/app/state/session.query';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  showConnector = false;
  isWalletConnector = false;

  constructor(
    public sessionQuery: SessionQuery,
    public connectorQuery: ConnectorQuery
  ) {
    this.connectorQuery.walletId.subscribe((connectorWallet) => {
      const { wallet } = this.sessionQuery.getValue();
      const userWallet = wallet?.wallet_id;

      this.isWalletConnector = connectorWallet === userWallet;
      this.showConnector = !!connectorWallet ? this.isWalletConnector : true;
    });
  }

  ngOnInit() {}
}
