import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public registrationForm: FormGroup;

  
  constructor(private formBuilder: FormBuilder) {
    this.initializeForm();
  }
  
  ngOnInit() {}
  
  initializeForm(): void {
    this.registrationForm = this.formBuilder.group({
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
    }, {validator: this.passwordValidator});
  }
  
  onSubmit(): void {
    console.log(this.registrationForm);
    console.log(this.registrationForm.controls);

  }

  get f() {
    return this.registrationForm.controls;
  }

  passwordValidator(control: AbstractControl): { [key: string]:boolean } | null {
    const password =control.get('password');
    const confirmPassword= control.get('confirmPassword');

    return password && confirmPassword && password.value !== confirmPassword.value ?
    {'misMatch' : true} :
    null;
  }
}
