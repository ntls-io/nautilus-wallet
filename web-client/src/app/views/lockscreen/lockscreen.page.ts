import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-lockscreen',
  templateUrl: './lockscreen.page.html',
  styleUrls: ['./lockscreen.page.scss'],
})
export class LockscreenPage implements OnInit {
  code: string;

  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {}

  dismiss(success: boolean) {
    this.modalCtrl.dismiss({
      type: 'dismiss',
      success,
      code: this.code,
    });
  }
  //TODO: implement function
  confirm() {
    //()=>{}
    if ('success') {
      this.dismiss(true);
    } else {
      //show error
      this.displayError('error message');
    }
  }

  async displayError(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
    });
    toast.present();
  }
}
