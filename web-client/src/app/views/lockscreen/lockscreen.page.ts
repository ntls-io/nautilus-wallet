import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-lockscreen',
  templateUrl: './lockscreen.page.html',
  styleUrls: ['./lockscreen.page.scss'],
})
export class LockscreenPage implements OnInit {
  @Input() autofocus = true;

  codeForm: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    public formBuilder: FormBuilder
  ) {
    this.codeForm = this.formBuilder.group({
      code: [
        null,
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(10),
          Validators.required,
          Validators.pattern(/^[0-9]*$/),
        ]),
      ],
    });
  }

  ngOnInit() {}

  dismiss(success: boolean) {
    this.modalCtrl.dismiss({
      success,
    });
  }
  //TODO: implement function
  onSubmit() {
    this.codeForm.markAllAsTouched();

    if (this.codeForm.valid) {
      //()=>{validate pin}
      if ('success') {
        this.dismiss(true);
      } else {
        //show error
        this.displayError('error message');
      }
    }
  }

  async displayError(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      color: 'danger',
      duration: 2000,
    });
    toast.present();
  }
}
