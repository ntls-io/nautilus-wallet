import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
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

  onSubmit(): void {
    // createWallet
    let res = {
      Created: {
        wallet_id: '12345',
        owner_name: 'test',
        algorand_address_base32: '12345',
      },
    };

    console.log(this.registrationForm);
    console.log(this.registrationForm.controls);
    this.router.navigate(['/print-wallet'], {
      state: { wallet_id: res.Created.wallet_id },
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
