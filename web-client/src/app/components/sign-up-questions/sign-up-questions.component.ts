import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up-questions',
  templateUrl: './sign-up-questions.component.html',
  styleUrls: ['./sign-up-questions.component.scss'],
})
export class SignUpQuestionsComponent implements OnInit {
  @Output() answers = new EventEmitter<any>();
  questionForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.questionForm = this.generateFormGroup();
  }

  generateFormGroup(): FormGroup {
    return this.formBuilder.group({
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
  }

  ngOnInit() {}

  validateForm() {
    this.questionForm.markAllAsTouched();
    if (this.questionForm.valid) {
      this.answers.emit(this.questionForm.value);
    }
  }
}
