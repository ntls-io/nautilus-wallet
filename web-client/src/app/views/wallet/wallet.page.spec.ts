import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { routes } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { SessionStore } from 'src/app/state/session.store';
import { stubActiveSession } from 'src/tests/state.helpers';
import {
  componentElement,
  verifyNavigationTrigger,
} from 'src/tests/test.helpers';
import { WalletPage } from './wallet.page';

describe('WalletPage', () => {
  let router: Router;
  let component: WalletPage;
  let fixture: ComponentFixture<WalletPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          IonicModule.forRoot(),
          RouterTestingModule.withRoutes(routes),
          HttpClientTestingModule,
          SharedModule,
        ],
      }).compileComponents();
      router = TestBed.inject(Router);
      router.navigate(['wallet']);
      fixture = TestBed.createComponent(WalletPage);
      component = fixture.componentInstance;

      // Satisfy OpenWalletGuard
      const sessionStore = TestBed.inject(SessionStore);
      stubActiveSession(sessionStore, {
        wallet: { owner_name: 'Wallet Owner' },
      });
      // For the balance checks:
      sessionStore.update({
        algorandAccountData: {
          address: 'placeholder address',
          amount: 0,
        },
      });

      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows name from store', () => {
    const heading = componentElement(fixture, 'h1');
    expect(heading.textContent?.trim()).toBe(`Wallet Owner's Wallet`);
  });

  const routerLinks: string[] = [
    '/wallet/send-funds',
    '/wallet/receive',
    '/kyc',
  ];

  for (const routerLink of routerLinks) {
    // FIXME(Pi,2022-03-21):These tests currently time out due to the toast in checkAlgorandAssetOptIn.
    //                       Disable them for now, until we have a fix.
    xit(`navigates to ${routerLink}`, async (): Promise<void> => {
      await verifyNavigationTrigger(router, fixture, '/wallet', routerLink);
    });
  }
});
