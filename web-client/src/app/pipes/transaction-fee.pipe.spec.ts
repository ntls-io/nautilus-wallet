import { TestBed } from '@angular/core/testing';
import { ConnectorQuery } from '../state/connector';
import { TransactionFeePipe } from './transaction-fee.pipe';

describe('TransactionFeePipe', () => {
  it('create an instance', () => {
    const connectorQuery: ConnectorQuery = TestBed.get(ConnectorQuery);
    const pipe = new TransactionFeePipe(connectorQuery);
    expect(pipe).toBeTruthy();
  });
});
