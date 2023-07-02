import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-schedule-pay',
  templateUrl: './new-schedule-pay.component.html',
  styleUrls: ['./new-schedule-pay.component.scss'],
})
export class NewSchedulePayComponent implements OnInit {
  /** Emit the Schedule confirmed by the user. */
  @Output() scheduleConfirmed = new EventEmitter<ScheduleValue>();

  scheduleForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(): void {
    if (this.scheduleForm.valid) {
      const { frequency, startDate, endDate }: ScheduleFormValue =
        this.scheduleForm.value;
      const schedule: ScheduleValue = {
        frequency,
        startDate,
        endDate,
      };
      this.scheduleConfirmed.emit(schedule);
      console.log(schedule);
    }
  }

  private initForm(): void {
    this.scheduleForm = new FormGroup({
      frequency: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(30),
      ]),
      startDate: new FormControl('', [Validators.required, this.dateValidator]),
      endDate: new FormControl('', [Validators.required, this.dateValidator]),
    });
  }

  private dateValidator() {
    return (control: FormControl) => {
      const selectedDate = new Date(control.value);
      const currentDate = new Date();
      return selectedDate > currentDate ? null : { dateInvalid: true };
    };
  }
}

interface ScheduleFormValue {
  frequency: number;
  startDate: string;
  endDate: string;
}

export interface ScheduleValue {
  frequency: number;
  startDate: string;
  endDate: string;
}
