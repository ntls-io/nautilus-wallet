import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Account } from 'src/app/stores/account';

@Component({
  selector: 'app-receive',
  templateUrl: './receive.page.html',
  styleUrls: ['./receive.page.scss'],
})
export class ReceivePage implements OnInit {
  @Input() account!: Account;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
