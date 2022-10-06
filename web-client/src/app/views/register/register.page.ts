import { Component, OnDestroy, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IonIntlTelInputValidators } from 'ion-intl-tel-input';
import { SessionService } from 'src/app/state/session.service';
import SwiperCore, { Pagination } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnDestroy {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  registrationForm: FormGroup;
  numInputMask = '9999999999';
  isOpening = false;
  subscription$;

  constructor(
    private formBuilder: FormBuilder,
    private sessionService: SessionService,
    private router: Router
  ) {
    this.registrationForm = this.generateFormGroup();

    this.subscription$ = this.f.pin.valueChanges.pipe().subscribe(() => {
      this.f.confirmPin.updateValueAndValidity();
    });
  }

  get f() {
    return this.registrationForm.controls;
  }

  generateFormGroup(): FormGroup {
    return this.formBuilder.group({
      firstName: [
        '',
        Validators.compose([Validators.minLength(2), Validators.required]),
      ],
      lastName: [
        '',
        Validators.compose([Validators.minLength(2), Validators.required]),
      ],
      mobile: [
        '',
        Validators.compose([
          Validators.required,
          IonIntlTelInputValidators.phone,
        ]),
      ],
      pin: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(10),
        ]),
      ],
      confirmPin: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(10),
          this.matchValues('pin'),
        ]),
      ],
    });
  }

  validateForm() {
    this.registrationForm.markAllAsTouched();
    if (this.registrationForm.valid) {
      this.swiper?.swiperRef?.slideNext();
    }
  }

  async onSubmit(answers: Map<string, string>): Promise<void> {
    /* istanbul ignore next TODO */
    console.log(answers);

    if (this.registrationForm.valid) {
      const phoneNumber =
        this.registrationForm.controls.mobile.value.internationalNumber
          .split(' ')
          .join('');

      const { firstName, lastName, pin } = this.registrationForm.value;

      try {
        await this.sessionService.createWallet(
          firstName + ' ' + lastName,
          pin,
          answers,
          phoneNumber
        );
        this.router.navigate(['/print-wallet']);
      } catch (err) {
        // TODO: error handling
        console.log(err);
      }
    }
  }

  matchValues(
    matchTo: string
  ): (arg0: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null =>
      !!control?.parent?.value &&
      control?.value ===
        (control.parent.controls as { [key: string]: AbstractControl })[matchTo]
          .value
        ? null
        : { mismatch: true };
  }

  onModalOpen(event: any) {
    if (event?.target?.type === 'button') {
      this.isOpening = true;
    }
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
