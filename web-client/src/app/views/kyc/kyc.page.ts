import { Component, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { IonSlides } from '@ionic/angular';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.page.html',
  styleUrls: ['./kyc.page.scss'],
})
export class KycPage implements OnInit {
  @ViewChild('slides') slides!: IonSlides;
  slideOpts = {
    allowTouchMove: false,
  };
  idType: string | undefined;

  constructor(private notification: SwalHelper) {}

  ngOnInit() {}

  async next() {
    const isEnd = await this.slides?.isEnd();
    if (!isEnd) {
      this.slides?.slideNext();
    }
  }

  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
      });

      const imageUrl = image.webPath;
      // TODO: upload image to server
    } catch (e) {
      console.log(e);
    }
  }

  async onSuccess() {
    await this.notification.swal.fire({
      icon: 'success',
      text: 'You have successfully submitted your ...',
    });
    // TODO: action after success message dismiss
  }

  async onError() {
    await this.notification.swal.fire({
      icon: 'error',
      text: 'Oops',
    });
  }
}
