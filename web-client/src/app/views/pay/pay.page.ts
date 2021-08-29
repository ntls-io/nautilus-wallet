import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {
  wallet!: string;
  paymentForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.paymentForm = this.formBuilder.group({
      amount: [0, Validators.compose([Validators.required])],
    });

    this.route.params.subscribe(({ wallet }) => {
      this.wallet = wallet;
    });
  }

  ngOnInit() {}
  onSubmit() {
    this.paymentForm.markAllAsTouched();

    if (this.paymentForm.valid) {
      //()=>{send payment}
    }
  }
}
