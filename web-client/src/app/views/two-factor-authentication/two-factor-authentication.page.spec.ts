import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TwoFactorAuthenticationPage } from './two-factor-authentication.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { routes } from '../../app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';

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
        FormsModule
      ]
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
