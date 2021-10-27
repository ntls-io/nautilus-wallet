import { Component, Input } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { SdkResponse } from 'onfido-sdk-ui';
import {
  Check,
  OnfidoKycStarted,
  OnfidoService,
} from 'src/app/services/onfido.service';
import { defined } from 'src/app/utils/errors/panic';
import { withLoadingOverlay } from 'src/app/utils/loading.helpers';
import { OnfidoFormValue } from 'src/app/views/kyc/onfido-form/onfido-form.component';

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
    private loadingController: LoadingController,
    private onfidoService: OnfidoService
  ) {}

  // In Step 1: Start the Onfido KYC process.
  async onSubmit({ firstName, lastName }: OnfidoFormValue): Promise<void> {
    await withLoadingOverlay(this.loadingController, async () => {
      this.onfidoStarted = await this.onfidoService.start(firstName, lastName);
      this.token = this.onfidoStarted.sdk_token;
    });
    this.viewState = 'step2_widget';
  }

  // In Step 2: Onfido widget completed: save response and hand off to `createCheck`.
  async onSdkComplete(sdkResponse: SdkResponse): Promise<void> {
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
  }

  // In Step 3: Refresh `this.check`.
  async refreshCheck(): Promise<void> {
    const checkId = defined(this.check?.id);
    await withLoadingOverlay(this.loadingController, async () => {
      this.check = await this.onfidoService.retrieveCheck(checkId);
      console.log('KycPage: refreshed check:', this.check);
    });
  }

  // Helper Pretty-printed `this.check`.
  checkPretty(): string {
    return JSON.stringify(this.check, null, 2);
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
