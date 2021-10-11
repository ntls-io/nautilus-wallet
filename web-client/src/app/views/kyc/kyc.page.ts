import { Component, Input } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { OnfidoService } from 'src/app/stores/onfido';
import { withLoadingOverlay } from '../../utils/loading.helpers';
import { OnfidoFormValue } from './onfido-form/onfido-form.component';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.page.html',
  styleUrls: ['./kyc.page.scss'],
})
export class KycPage {
  @Input() token = '';

  constructor(
    private loadingController: LoadingController,
    private onfidoService: OnfidoService
  ) {}

  async onSubmit({ firstName, lastName }: OnfidoFormValue): Promise<void> {
    await withLoadingOverlay(this.loadingController, async () => {
      this.token = await this.onfidoService.getToken(firstName, lastName);
    });
  }
}
