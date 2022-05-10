import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { createMask } from '@ngneat/input-mask';
import { SessionService } from 'src/app/state/session.service';
import { IonIntlTelInputModel } from 'ion-intl-tel-input';

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
  // TODO(Pi): We should replace this with something that handles international numbers (probably libphonenumber-based?)
  //           (See also: E-164 hack in SessionService.)
  //phoneInputMask = createMask({
  //  mask: '(999) 999-99-99',
  //  autoUnmask: true,
  //});

  mobile: IonIntlTelInputModel = {
    dialCode: '+27',
    internationalNumber: "+27 76 2736821",
    isoCode: 'za',
    nationalNumber: '076 273 6821'
  };
  formValue = {mobile: this.mobile};

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
            Validators.minLength(10),
            Validators.maxLength(10),
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
      try {
        await this.sessionService.createWallet(
          this.registrationForm.controls.firstName.value +
            ' ' +
            this.registrationForm.controls.lastName.value,
          this.registrationForm.controls.pin.value,
          this.registrationForm.controls.mobile.value
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
