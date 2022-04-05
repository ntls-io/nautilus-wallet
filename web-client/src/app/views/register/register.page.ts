import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { createMask } from '@ngneat/input-mask';
import { WalletService } from 'src/app/services/wallet';

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
  phoneInputMask = createMask({
    mask: '(999) 999-99-99',
    autoUnmask: true,
  });

  // XXX(Pi): Temporarily disable.
  enableMobile = false;

  constructor(
    private formBuilder: FormBuilder,
    private walletService: WalletService,
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
        ...(this.enableMobile
          ? {
              mobile: [
                '',
                Validators.compose([
                  Validators.required,
                  Validators.minLength(10),
                  Validators.maxLength(10),
                ]),
              ],
            }
          : {}),
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
        await this.walletService.createWallet(
          this.registrationForm.controls.firstName.value +
            ' ' +
            this.registrationForm.controls.lastName.value,
          this.registrationForm.controls.pin.value
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
