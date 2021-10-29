import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

export type OnfidoFormValue = {
  firstName: string;
  lastName: string;
};

/**
 * Form to collect the details to start the Onfido process.
 */
@Component({
  selector: 'app-onfido-form',
  templateUrl: './onfido-form.component.html',
  styleUrls: ['./onfido-form.component.scss'],
})
export class OnfidoFormComponent implements OnInit {
  // Initial first name.
  @Input() firstName = '';

  // Initial last name.
  @Input() lastName = '';

  //
  @Output() submitted = new EventEmitter<OnfidoFormValue>();

  nameForm = new FormGroup({
    firstName: nameControl(),
    lastName: nameControl(),
  });

  constructor() {}

  ngOnInit() {
    // Set initial values.
    this.nameForm.setValue({
      firstName: this.firstName,
      lastName: this.lastName,
    });
  }

  // Emit `this.submitted`
  onSubmit() {
    if (this.nameForm.valid) {
      const value: OnfidoFormValue = this.nameForm.value;
      const { firstName, lastName } = value;
      const trimmed = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      };
      this.submitted.emit(trimmed);
    }
  }
}

// FormControl for names: non-blank strings.
const nameControl = () => new FormControl('', [Validators.required, notBlank]);

// Validator: Reject blank, whitespace-only strings.
const notBlank: ValidatorFn = (control) =>
  control.value.trim() === '' ? { notEmpty: true } : null;
