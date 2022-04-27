import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { checkClass } from 'src/helpers/helpers';

@Component({
  selector: 'app-manual-address',
  templateUrl: './manual-address.page.html',
  styleUrls: ['./manual-address.page.scss'],
})
export class ManualAddressPage implements OnInit {
  addressForm: FormGroup;

  constructor(private modalCtrl: ModalController) {
    this.addressForm = new FormGroup({
      address: new FormControl('', [Validators.required, addressValidator]),
    });
  }

  ngOnInit() {}

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
