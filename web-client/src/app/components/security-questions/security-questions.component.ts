import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-security-questions',
  templateUrl: './security-questions.component.html',
  styleUrls: ['./security-questions.component.scss'],
})
export class SecurityQuestionsComponent implements OnInit {
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
