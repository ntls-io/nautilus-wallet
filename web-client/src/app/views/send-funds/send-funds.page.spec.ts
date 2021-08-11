import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { routes } from '../../app-routing.module';
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
        ],
      }).compileComponents();

      router = TestBed.inject(Router);
      router.navigate(['home']);
      fixture = TestBed.createComponent(SendFundsPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
