import { Component, Input } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Keyboard, KeyboardResize } from '@capacitor/keyboard';
import { LoadingController, NavController } from '@ionic/angular';
import { SdkResponse } from 'onfido-sdk-ui';
import {
  Check,
  OnfidoKycStarted,
  OnfidoService,
} from 'src/app/services/onfido.service';
import { SessionService } from 'src/app/state/session.service';
import { withConsoleGroup } from 'src/app/utils/console.helpers';
import { defined } from 'src/app/utils/errors/panic';
import {
  withLoadingOverlay,
  withLoadingOverlayOpts,
} from 'src/app/utils/loading.helpers';
import { OnfidoFormValue } from 'src/app/views/kyc/onfido-form/onfido-form.component';
import { OnfidoCheckResult } from 'src/schema/actions';

// This view states:
// 1. The name-capture form
// 2. The Onfido SDK widget
// 3. The KYC result (for now)
type ViewState = 'step1_form' | 'step2_widget' | 'step3_result';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.page.html',
  styleUrls: ['./kyc.page.scss'],
})
export class KycPage {
  @Input() viewState: ViewState = 'step1_form';

  @Input() token?: string;
  @Input() onfidoStarted?: OnfidoKycStarted;
  @Input() sdkResponse?: SdkResponse;
  @Input() check?: Check;

  constructor(
    private navController: NavController,
    private loadingController: LoadingController,
    private sessionService: SessionService,
    private onfidoService: OnfidoService
  ) {}

  get checkIsComplete() {
    return this.check?.status === 'complete';
  }

  get checkIsClear() {
    return this.check?.result === 'clear';
  }

  // In Step 1: Start the Onfido KYC process.
  async onSubmit({ firstName, lastName }: OnfidoFormValue): Promise<void> {
    await withLoadingOverlay(this.loadingController, async () => {
      this.onfidoStarted = await this.onfidoService.start(firstName, lastName);
      this.token = this.onfidoStarted.sdk_token;
    });
    this.viewState = 'step2_widget';

    if (Capacitor.isNativePlatform()) {
      Keyboard.setResizeMode({ mode: KeyboardResize.None });
    }
  }

  // In Step 2: Onfido widget completed: save response and hand off to `createCheck`.
  async onSdkComplete(sdkResponse: SdkResponse): Promise<void> {
    if (Capacitor.isNativePlatform()) {
      Keyboard.setResizeMode({ mode: KeyboardResize.Native });
    }

    console.log('KycPage: Onfido SDK response:', sdkResponse);
    this.sdkResponse = sdkResponse;
    await this.createCheck();
  }

  // In Step 2: Create a check for the reports we're interested in.
  async createCheck(): Promise<void> {
    await withLoadingOverlay(this.loadingController, async () => {
      const applicantId = defined(this.onfidoStarted?.applicant_id);
      this.check = await this.onfidoService.createCheck(applicantId, [
        'document',
        'facial_similarity_video',
      ]);
      console.log('KycPage: created check:', this.check);
    });
    this.viewState = 'step3_result';

    // Kick off an initial check.
    await this.refreshCheck();
  }

  // In Step 3: Refresh `this.check`.
  async refreshCheck(): Promise<void> {
    const checkId = defined(this.check?.id);
    await withLoadingOverlay(this.loadingController, async () => {
      this.check = await this.onfidoService.retrieveCheck(checkId);
      console.log('KycPage: refreshed check:', this.check);
    });
  }

  // In Step 3: Save completed check result.
  // Navigate back to root on success.
  async saveCheck(): Promise<void> {
    if (
      this.check !== undefined &&
      this.check.id &&
      this.check.href &&
      this.check.result &&
      this.check.status === 'complete'
    ) {
      const onfidoCheckResult: OnfidoCheckResult = {
        id: this.check.id,
        href: this.check.href,
        result: this.check.result,
        sub_result: this.check?.sub_result,
      };
      const saved = await withLoadingOverlayOpts(
        this.loadingController,
        { message: 'Saving…' },
        async () =>
          await withConsoleGroup(
            'KycPage.refreshCheck: Persisting check:',
            async () => {
              console.log('Check (from API):', this.check);
              console.log('onfidoCheckResult (to save)', onfidoCheckResult);
              await this.sessionService.saveOnfidoCheck(onfidoCheckResult);
              return true;
            }
          )
      );
      if (saved) {
        await this.navController.navigateRoot('/wallet');
      }
    }
  }

  ionViewDidLeave() {
    if (Capacitor.isNativePlatform()) {
      Keyboard.setResizeMode({ mode: KeyboardResize.Native });
    }
  }
}

// Docs: <https://documentation.onfido.com/v2/#check-status>
type OnfidoStatus =
  | 'in_progress'
  | 'awaiting_applicant'
  | 'complete'
  | 'withdrawn'
  | 'paused'
  | 'reopened';

// Docs: <https://documentation.onfido.com/v2/#report-results>
type OnfidoResult = 'clear' | 'consider' | 'unidentified';
