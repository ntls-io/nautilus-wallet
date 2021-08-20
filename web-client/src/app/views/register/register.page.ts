import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { WalletService } from 'src/app/wallet.service';
import { WalletDisplay } from 'src/schema/entities';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public registrationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private walletService: WalletService
  ) {
    this.initializeForm();
  }

  ngOnInit() {}

  initializeForm(): void {
    this.registrationForm = this.formBuilder.group(
      {
        firstName: ['', Validators.compose([Validators.required])],
        lastName: ['', Validators.compose([Validators.required])],
        mobile: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(10),
          ]),
        ],
        password: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(10),
          ]),
        ],
        confirmPassword: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(10),
          ]),
        ],
      },
      { validator: this.passwordValidator }
    );
  }

  async onSubmit(): Promise<void> {
    // createWallet
    let res = await this.walletService
      .createWallet({
        auth_pin: this.registrationForm.controls.password.value,
        owner_name: this.registrationForm.controls.firstName.value,
      })
      .toPromise();
    if ((res as { Failed: string }).Failed) {
      throw new Error('failed');
    }

    console.log(this.registrationForm);
    console.log(this.registrationForm.controls);
    this.router.navigate(['/print-wallet'], {
      state: {
        wallet_id: (res as { Created: WalletDisplay }).Created.wallet_id,
      },
    });
  }

  get f() {
    return this.registrationForm.controls;
  }

  passwordValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    return password &&
      confirmPassword &&
      password.value !== confirmPassword.value
      ? { misMatch: true }
      : null;
  }
}
