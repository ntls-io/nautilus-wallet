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
          customUI: {
            fontFamilyTitle: 'nasalization',
            fontFamilyBody: 'Open Sans',
            colorBackgroundSurfaceModal: 'var(--ion-color-primary-background)',
            colorBorderSurfaceModal: 'var(--ion-color-primary-background)',
            colorContentBody: 'var(--ion-color-white)',
            colorContentTitle: 'var(--ion-color-white)',
            colorContentSubtitle: 'var(--ion-color-white)',
            colorBackgroundDocTypeButton: 'var(--ion-color-primary-background)',
            colorContentDocTypeButton: 'var(--ion-color-white)',
            colorBorderDocTypeButton: 'var(--ion-color-white)',
            colorBorderDocTypeButtonHover: 'var(--ion-color-tertiary)',
            colorBackgroundIcon: 'var(--ion-color-primary-background)',

            colorContentButtonPrimaryText: 'var(--ion-color-white)',
            colorBackgroundButtonPrimary: 'var(--ion-color-primary)',
            colorBorderButtonPrimary: 'var(--ion-color-primary)',
            colorBackgroundButtonPrimaryHover: 'var(--ion-color-primary-shade)',
            colorBackgroundButtonPrimaryActive: 'var(--ion-color-primary-tint)',

            colorBackgroundButtonIconHover: 'var(--ion-color-white)',
            colorBackgroundButtonIconActive: 'var(--ion-color-white)',

            colorBackgroundLinkHover: 'var(--ion-color-primary-shade)',
            colorBorderLinkUnderline: 'var(--ion-color-primary)',
            colorContentLinkTextHover: 'var(--ion-color-white)',
            colorBackgroundLinkActive: 'var(--ion-color-primary-tint)',
          },
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
