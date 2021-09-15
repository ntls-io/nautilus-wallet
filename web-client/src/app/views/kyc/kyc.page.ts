import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

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
  constructor() {}

  ngOnInit() {}

  async next() {
    const isEnd = await this.slides?.isEnd();
    if (!isEnd) {
      this.slides?.slideNext();
    }
  }
}
