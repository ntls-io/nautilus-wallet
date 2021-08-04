import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { routes } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { verifyNavigationTrigger } from '../../../tests/test.helpers';
import { WalletPage } from './wallet.page';

describe('WalletPage', () => {
  let router: Router;
  let component: WalletPage;
  let fixture: ComponentFixture<WalletPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [WalletPage],
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
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('navigates to send funds', async (): Promise<void> => {
    await verifyNavigationTrigger(
      router,
      fixture,
      '/wallet',
      '/wallet/send-funds'
    );
  });
});
