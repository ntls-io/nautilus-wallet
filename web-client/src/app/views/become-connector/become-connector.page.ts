import { Component, OnInit } from '@angular/core';
import { ConnectorService } from 'src/app/state/connector';
import { SessionQuery } from 'src/app/state/session.query';

@Component({
  selector: 'app-become-connector',
  templateUrl: './become-connector.page.html',
  styleUrls: ['./become-connector.page.scss'],
})
export class BecomeConnectorPage implements OnInit {
  isConfirmed = false;

  constructor(
    private connectorService: ConnectorService,
    public sessionQuery: SessionQuery
  ) {}

  ngOnInit() {}

  setWalletId() {
    const { wallet } = this.sessionQuery.getValue();
    this.connectorService.becomeConnector(wallet?.wallet_id);
  }
}
