import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { isValidAddress } from 'algosdk';

@Component({
  selector: 'app-manual-address',
  templateUrl: './manual-address.page.html',
  styleUrls: ['./manual-address.page.scss'],
})
export class ManualAddressPage implements OnInit {
  addressForm: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder
  ) {
    this.addressForm = this.formBuilder.group(
      {
        address: ['', Validators.compose([Validators.required])],
      },
      { validator: this.addressValidator }
    );
  }

  ngOnInit() {}

  addressValidator(fg: FormGroup) {
    const address = fg.get('address')?.value;

    return isValidAddress(address) ? null : { invalidAddress: true };
  }

  dismiss(success: boolean, address?: string) {
    this.modalCtrl.dismiss({
      success,
      address,
    });
  }

  onSubmit() {
    this.addressForm.markAllAsTouched();

    console.log(this.addressForm);

    if (this.addressForm.valid) {
      const address = this.addressForm.get('address')?.value;
      this.dismiss(true, address);
    }
  }
}
