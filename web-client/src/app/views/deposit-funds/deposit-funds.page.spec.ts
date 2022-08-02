import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { routes } from '../../app-routing.module';
import { DepositFundsPage } from './deposit-funds.page';

describe('DepositFundsPage', () => {
  let component: DepositFundsPage;
  let fixture: ComponentFixture<DepositFundsPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DepositFundsPage],
        imports: [
          IonicModule.forRoot(),
          RouterTestingModule.withRoutes(routes),
          HttpClientTestingModule,
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(DepositFundsPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
