import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { init } from 'onfido-sdk-ui';
import { OnfidoQuery, OnfidoService, OnfidoStore } from 'src/app/stores/onfido';
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
  onfido: any;

  constructor(
    private notification: SwalHelper,
    private onfidoQuery: OnfidoQuery,
    private onfidoService: OnfidoService,
    private onfidoStore: OnfidoStore
  ) {}

  ngOnInit() {
    this.onfidoQuery.select('token').subscribe((token) => {
      if (token) {
        this.onfido = init({
          token,
          customUI: {},
          steps: [
            {
              type: 'document',
              options: {
                documentTypes: {
                  passport: true,
                  driving_licence: true,
                  national_identity_card: true,
                },
                useLiveDocumentCapture: true,
              },
            },
            {
              type: 'face',
              options: {
                uploadFallback: false,
                requestedVariant: 'video',
              },
            },
          ],

          onComplete: (data) => {
            console.log('everything is complete', data);
          },
        });
      }
    });
  }

  ionViewWillEnter() {
    this.onfidoService.getToken();
  }

  ionViewDidLeave() {
    this.onfido.tearDown();
    this.onfidoStore.reset();
  }
}
