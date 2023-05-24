import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { routes } from '../../app-routing.module';
import { TwoFactorAuthenticationPage } from './two-factor-authentication.page';

describe('TwoFactorAuthenticationPage', () => {
  let router: Router;
  let component: TwoFactorAuthenticationPage;
  let fixture: ComponentFixture<TwoFactorAuthenticationPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule,
        FormsModule,
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    router.navigate(['2FA']);
    fixture = TestBed.createComponent(TwoFactorAuthenticationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
