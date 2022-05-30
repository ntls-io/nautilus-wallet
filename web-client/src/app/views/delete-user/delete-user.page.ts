import { Component, OnInit, Input } from '@angular/core';
import { AssetAmount } from 'src/app/utils/assets/assets.common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { checkClass } from 'src/helpers/helpers';
import { withLoadingOverlayOpts } from 'src/app/utils/loading.helpers';
import { LoadingController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.page.html',
  styleUrls: ['./delete-user.page.scss'],
})
export class DeleteUserPage implements OnInit {
  addressForm: FormGroup;

  /** Wallet's balances. */
  @Input() balances?: AssetAmount[] | null;

  /** True if balances are in the process of being updated */
  @Input() balancesIsLoading = false;

  constructor(
    private modalCtrl: ModalController,
    private loadingController: LoadingController
    ) {
    this.addressForm = new FormGroup({
      address: new FormControl('', [Validators.required, addressValidator]),
    });
   }

   async ngOnInit(): Promise<void> {
    await this.refreshWalletData();
  }

  dismiss(success: boolean, address?: string) {
    this.modalCtrl.dismiss({
      success,
      address,
    });
  }

  onSubmit() {
    this.addressForm.markAllAsTouched();
    if (this.addressForm.valid) {
      const formControl = checkClass(
        this.addressForm.controls.address,
        FormControl
      );
      const address = trimmedValue(formControl);
      this.dismiss(true, address);
    }
  }

  async onRefresh(): Promise<void> {
    await withLoadingOverlayOpts(
      this.loadingController,
      { message: 'Refreshing…' },
      async () => await this.refreshWalletData()
    );
  }
  refreshWalletData(): any {
    throw new Error('Method not implemented.');
  }



}

const addressValidator = (formGroup: FormControl) => {
  const address = trimmedValue(formGroup);
  return address ? null : { invalidAddress: true };
};

const trimmedValue = (formControl: FormControl) => {
  const value = formControl.value;
  if (typeof value === 'string') {
    return value.trim();
  } else {
    throw TypeError(`ManualAddressPage: expected string, got ${typeof value}`);
  }
};
