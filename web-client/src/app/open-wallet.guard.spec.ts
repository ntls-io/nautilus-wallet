import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './app-routing.module';
import { OpenWalletGuard } from './open-wallet.guard';

describe('OpenWalletGuard', () => {
  let guard: OpenWalletGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
    });
    guard = TestBed.inject(OpenWalletGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
