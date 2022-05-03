import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, ToastController } from '@ionic/angular';
import { routes } from 'src/app/app-routing.module';
import { SessionStore } from 'src/app/state/session.store';
import { stubActiveSession } from 'src/tests/state.helpers';
import {
  assertShowsToast,
  componentElement,
  verifyNavigationTrigger,
} from 'src/tests/test.helpers';
import { WalletPageModule } from './wallet.module';
import { WalletPage } from './wallet.page';

describe('WalletPage', () => {
  let router: Router;
  let toastCtrl: ToastController;

  let component: WalletPage;
  let fixture: ComponentFixture<WalletPage>;

  const assertShowsStartupToast = (f: () => void): void => {
    assertShowsToast(
      toastCtrl,
      {
        message: 'No account balance. Deposit some Algo to get started.',
        duration: 5000,
      },
      async () => f()
    );
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          IonicModule.forRoot(),
          RouterTestingModule.withRoutes(routes),
          HttpClientTestingModule,
          WalletPageModule,
        ],
      }).compileComponents();

      router = TestBed.inject(Router);
      router.navigate(['wallet']);
      toastCtrl = TestBed.inject(ToastController);

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

      assertShowsStartupToast(() => {
        fixture.detectChanges();
      });
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows name from store', () => {
    const heading = componentElement(fixture, 'h1');
    expect(heading.textContent?.trim()).toBe("Wallet Owner's Wallet");
  });

  const routerLinks: string[] = [
    '/wallet/send-funds',
    '/wallet/receive',
    // '/kyc', // XXX: Not shown by default:
  ];

  for (const routerLink of routerLinks) {
    it(`navigates to ${routerLink}`, async (): Promise<void> => {
      await verifyNavigationTrigger(router, fixture, '/wallet', routerLink);
    });
  }
});
