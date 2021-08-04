import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { verifyNavigationTrigger } from '../../../tests/test.helpers';
import { routes } from '../../app-routing.module';
import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let router: Router;
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LoginPage],
        imports: [
          IonicModule.forRoot(),
          RouterTestingModule.withRoutes(routes),
        ],
      }).compileComponents();

      router = TestBed.inject(Router);
      router.navigate(['login']);
      fixture = TestBed.createComponent(LoginPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('navigates to wallet', async (): Promise<void> => {
    await verifyNavigationTrigger(router, fixture, '/login', '/wallet');
  });

  it('navigates to register', async (): Promise<void> => {
    await verifyNavigationTrigger(router, fixture, '/login', '/register');
  });
});
