import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { routes } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { SessionStore } from 'src/app/stores/session';
import {
  componentElement,
  verifyNavigationTrigger,
} from 'src/tests/test.helpers';
import { WalletPage } from './wallet.page';

describe('WalletPage', () => {
  let router: Router;
  let component: WalletPage;
  let fixture: ComponentFixture<WalletPage>;
  let sessionStore: SessionStore;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          IonicModule.forRoot(),
          RouterTestingModule.withRoutes(routes),
          SharedModule,
        ],
      }).compileComponents();
      router = TestBed.inject(Router);
      router.navigate(['wallet']);
      fixture = TestBed.createComponent(WalletPage);
      component = fixture.componentInstance;

      sessionStore = TestBed.inject(SessionStore);
      sessionStore.update({
        name: 'Wallet Owner',
        walletId: 'fake', // Satisfy OpenWalletGuard
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

  const routerLinks: string[] = ['/wallet/send-funds', '/wallet/receive'];

  for (const routerLink of routerLinks) {
    it(`navigates to ${routerLink}`, async (): Promise<void> => {
      await verifyNavigationTrigger(router, fixture, '/wallet', routerLink);
    });
  }
});
