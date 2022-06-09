import { TransactionFeePipe } from './transaction-fee.pipe';

describe('TransactionFeePipe', () => {
  it('create an instance', () => {
    const pipe = new TransactionFeePipe();
    expect(pipe).toBeTruthy();
  });
});
