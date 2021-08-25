import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  scanSuccessHandler(data: any) {
    this.modalCtrl.dismiss(data);
  }

  //TODO: handle scan error
  scanErrorHandler(event: any) {
    console.log(event);
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }
}
