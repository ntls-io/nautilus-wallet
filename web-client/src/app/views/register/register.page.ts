import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
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
  nonValidSubmit = true;
  numInputMask = createMask({
    alias: 'numeric',
    rightAlign: false,
    placeholder: '',
  });

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
    return this.formBuilder.group(
      {
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
          ]),
        ],
      },
      { validator: this.pinValidator }
    );
  }

  async onSubmit(): Promise<void> {
    /* istanbul ignore next TODO */

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
    } else {
      this.showErrors();
    }
  }

  pinValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const pin = control.get('pin');
    const confirmPin = control.get('confirmPin');

    return pin && confirmPin && pin.value !== confirmPin.value
      ? { misMatch: true }
      : null;
  }

  showErrors() {
    this.nonValidSubmit = false;
  }
}
