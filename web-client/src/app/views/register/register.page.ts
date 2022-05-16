import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { createMask } from '@ngneat/input-mask';
import { IonIntlTelInputValidators } from 'ion-intl-tel-input';
import { SessionService } from 'src/app/state/session.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public registrationForm: FormGroup;
  numInputMask = createMask({
    alias: 'numeric',
    rightAlign: false,
    placeholder: '',
  });
  isOpening = false;

  constructor(
    private formBuilder: FormBuilder,
    private sessionService: SessionService,
    private router: Router
  ) {
    this.registrationForm = this.generateFormGroup();
  }

  get f() {
    return this.registrationForm.controls;
  }

  ngOnInit() {}

  generateFormGroup(): FormGroup {
    return this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
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

  async onSubmit(): Promise<void> {
    /* istanbul ignore next TODO */
    this.registrationForm.markAllAsTouched();

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

  onModalOpen(event: { target: { type: 'button' | 'tel' } }) {
    if (event?.target?.type === 'button') {
      this.isOpening = true;
    }
  }
}
