import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.initializeForm();
  }

  ngOnInit() {}

  initializeForm(): void{
    this.registrationForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      mobile: '',
      password: '',
      confirmPassword: ''
    })
  };

  onSubmit(): void {
    console.log(this.registrationForm.value);
  }
}
