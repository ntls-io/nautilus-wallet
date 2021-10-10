import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  init,
  SdkHandle,
  SdkResponse,
  StepConfig,
  UICustomizationOptions,
} from 'onfido-sdk-ui';

/**
 * Wrap the Onfido SDK input widget.
 */
@Component({
  selector: 'app-onfido-widget',
  templateUrl: './onfido-widget.component.html',
  styleUrls: ['./onfido-widget.component.scss'],
})
export class OnfidoWidgetComponent implements OnInit, OnDestroy {
  /** The Onfido SDK token to use. */
  @Input() token?: string;

  // Emitted when the Onfido process completes.
  @Output() completed = new EventEmitter<SdkResponse>();

  /** The instantiated Onfido widget. */
  onfidoHandle?: SdkHandle;

  constructor() {}

  ngOnInit() {
    this.onfidoHandle = init({
      token: this.getToken(),
      // customUI: nautilusCustomUI, // TODO: Text colour?
      steps: nautilusSteps,

      onComplete: (sdkResponse) => {
        this.completed.emit(sdkResponse);
      },
    });
  }

  ngOnDestroy() {
    this.onfidoHandle?.tearDown();
  }

  // Safe getter for `this.token`.
  getToken(): string {
    if (this.token) {
      return this.token;
    } else {
      throw new Error('OnfidoWidgetComponent: expect input property: token');
    }
  }
}

const nautilusSteps: Array<StepConfig> = [
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
];

// Customise the Onfido widget to match the Nautilus theme.
//
// Docs:
// - <https://github.com/onfido/onfido-sdk-ui/blob/master/UI_CUSTOMIZATION.md>
// - <https://developers.onfido.com/guide/sdk-customization#web>

const nautilusCustomUI: UICustomizationOptions = {
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
};
