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
  PublicStepConfig,
  SdkHandle,
  SdkResponse,
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
      customUI: nautilusCustomUI,
      steps: nautilusSteps,

      onComplete: (sdkResponse) => {
        this.completed.emit(sdkResponse);
        this.onfidoHandle?.tearDown();
      },
    });
  }

  ngOnDestroy() {
    console.log('OnfidoWidgetComponent tearDown');
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

const nautilusSteps: Array<PublicStepConfig> = [
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
      uploadFallback: true,
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
  // Typography options
  fontFamilyTitle: 'nasalization',
  fontFamilyBody: 'Open Sans',
  colorContentTitle: 'var(--ion-color-white)',
  colorContentSubtitle: 'var(--ion-color-white)',
  colorContentBody: 'var(--ion-color-white)',

  // Modal (SDK main container)
  colorBackgroundSurfaceModal: 'var(--ion-color-primary-background)',
  borderStyleSurfaceModal: 'none',

  // Primary Buttons
  colorContentButtonPrimaryText: 'var(--ion-color-primary-contrast)',
  colorBackgroundButtonPrimary: 'var(--ion-color-primary)',
  colorBackgroundButtonPrimaryHover: 'var(--ion-color-primary-tint)',
  colorBackgroundButtonPrimaryActive: 'var(--ion-color-primary-tint)',
  colorBorderButtonPrimary: 'var(--ion-color-primary)',

  // Secondary Buttons
  colorContentButtonSecondaryText: 'var(--ion-color-secondary-contrast)',
  colorBackgroundButtonSecondary: 'var(--ion-color-secondary)',
  colorBackgroundButtonSecondaryHover: 'var(--ion-color-secondary-tint)',
  colorBackgroundButtonSecondaryActive: 'var(--ion-color-secondary-tint)',
  colorBorderButtonSecondary: 'var(--ion-color-secondary)',

  // Document Type Buttons
  colorBackgroundDocTypeButton: 'var(--ion-color-primary-background)',
  colorContentDocTypeButton: 'var(--ion-color-white)',
  colorBorderDocTypeButton: 'var(--ion-color-white)',
  colorBorderDocTypeButtonHover: 'var(--ion-color-tertiary)',

  // Icon Background option
  colorBackgroundIcon: 'var(--ion-color-primary-background)',

  // Links
  colorContentLinkTextHover: 'var(--ion-color-white)',
  colorBorderLinkUnderline: 'var(--ion-color-primary)',
  colorBackgroundLinkHover: 'var(--ion-color-primary-shade)',
  colorBackgroundLinkActive: 'var(--ion-color-primary-tint)',

  // Icon Buttons
  colorBackgroundButtonIconHover: 'var(--ion-color-white)',
  colorBackgroundButtonIconActive: 'var(--ion-color-white)',
};
