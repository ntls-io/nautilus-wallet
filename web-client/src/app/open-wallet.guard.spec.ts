import { TestBed } from '@angular/core/testing';
import { OpenWalletGuard } from './open-wallet.guard';

describe('OpenWalletGuard', () => {
  let guard: OpenWalletGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OpenWalletGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
