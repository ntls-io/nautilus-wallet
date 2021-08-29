import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public registrationForm: FormGroup;
  nonValidSubmit = true;

  constructor(private formBuilder: FormBuilder) {
    this.registrationForm = this.generateFormGroup();
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

  onSubmit(): void {
    /* istanbul ignore next TODO */
    if (this.registrationForm.valid) {
      // TODO: Submit registration to the backend
      console.log(this.registrationForm);
      console.log(this.registrationForm.controls);
    } else {
      this.showErrors();
    }
  }

  get f() {
    return this.registrationForm.controls;
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
