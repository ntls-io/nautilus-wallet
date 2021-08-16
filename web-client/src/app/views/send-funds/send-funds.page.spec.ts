import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { verifyNavigationTrigger } from 'src/tests/test.helpers';
import { routes } from '../wallet/wallet-routing.module';
import { SendFundsPage } from './send-funds.page';

describe('SendFundsPage', () => {
  let router: Router;
  let component: SendFundsPage;
  let fixture: ComponentFixture<SendFundsPage>;

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
      router.navigate(['send-funds']);
      fixture = TestBed.createComponent(SendFundsPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('navigates to scanner', async (): Promise<void> => {
    await verifyNavigationTrigger(router, fixture, '/send-funds', 'scanner');
  });
});
