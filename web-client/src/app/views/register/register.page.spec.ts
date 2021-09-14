import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { verifyNavigationTrigger } from '../../../tests/test.helpers';
import { routes } from '../../app-routing.module';
import { RegisterPage } from './register.page';

describe('RegisterPage', () => {
  let router: Router;
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          IonicModule.forRoot(),
          RouterTestingModule.withRoutes(routes),
          ReactiveFormsModule,
        ],
      }).compileComponents();

      router = TestBed.inject(Router);
      router.navigate(['register']);
      fixture = TestBed.createComponent(RegisterPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('navigates to login', async (): Promise<void> => {
    await verifyNavigationTrigger(router, fixture, '/register', '/login');
  });
});
