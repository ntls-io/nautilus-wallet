import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
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
          FormsModule,
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

  it('#onSubmit should show errors if the form is invalid', () => {
    const getValidSpy = spyOnProperty(
      component.registrationForm,
      'valid',
      'get'
    ).and.returnValue(false);
    const showErrorsSpy = spyOn(component, 'showErrors');

    component.onSubmit();

    expect(showErrorsSpy).toHaveBeenCalled();
    expect(getValidSpy).toHaveBeenCalled();
  });

  it('#showErrors should set nonValidSubmit to false', () => {
    component.showErrors();
    expect(component.nonValidSubmit).toBeFalse();
  });
});
