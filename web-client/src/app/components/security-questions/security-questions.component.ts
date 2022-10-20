import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-security-questions',
  templateUrl: './security-questions.component.html',
  styleUrls: ['./security-questions.component.scss'],
})
export class SecurityQuestionsComponent implements OnInit {
  @Output() answers = new EventEmitter<any>();
  questions = [
    { field: 'mother', text: 'What is your mothers maiden name?' },
    { field: 'city', text: 'What city were you born in?' },
    { field: 'pet', text: 'What is your pet name?' },
  ];
  form: UntypedFormGroup = this.formBuilder.group({
    mother: [
      '',
      Validators.compose([Validators.minLength(2), Validators.required]),
    ],
    city: [
      '',
      Validators.compose([Validators.minLength(2), Validators.required]),
    ],
    pet: [
      '',
      Validators.compose([Validators.minLength(2), Validators.required]),
    ],
  });

  constructor(private formBuilder: UntypedFormBuilder) {}

  get f() {
    return this.form.controls;
  }

  ngOnInit() {}

  validateForm() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const qMap = new Map(Object.entries(this.form.getRawValue()));
      this.answers.emit(qMap);
    }
  }
}
