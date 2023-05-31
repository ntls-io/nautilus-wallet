import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { verifyNavigationTrigger } from '../../../tests/test.helpers';
import { getTranslocoTestingModule } from '../../../tests/transloco.helpers';
import { routes } from '../../app-routing.module';
import { LandingPage } from './landing.page';

describe('LandingPage', () => {
  let router: Router;
  let component: LandingPage;
  let fixture: ComponentFixture<LandingPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes(routes),
        getTranslocoTestingModule(),
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    router.navigate(['landing']);
    fixture = TestBed.createComponent(LandingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('navigates to wallet', async (): Promise<void> => {
    await verifyNavigationTrigger(
      router,
      fixture,
      '/landing',
      '/wallet-access'
    );
  });

  it('navigates to register', async (): Promise<void> => {
    await verifyNavigationTrigger(router, fixture, '/landing', '/register');
  });
});
