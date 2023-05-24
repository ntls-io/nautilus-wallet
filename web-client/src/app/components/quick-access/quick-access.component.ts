import { Component, Input, OnInit } from '@angular/core';
import { Clipboard } from '@capacitor/clipboard';
import {
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import {
  QAccess,
  QAccessQuery,
  QAccessService,
  QAccessStore,
} from 'src/app/state/qAccess';
import { SessionService } from 'src/app/state/session.service';
import { withLoadingOverlayOpts } from 'src/app/utils/loading.helpers';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import { environment } from 'src/environments/environment';
import { showToast } from '../../utils/toast.helpers';

@Component({
  selector: 'app-quick-access',
  templateUrl: './quick-access.component.html',
  styleUrls: ['./quick-access.component.scss'],
})
export class QuickAccessComponent implements OnInit {
  @Input() isPinEntryOpen = false;

  walletAddress: string | undefined;

  hideSavedWalletAddress = environment.enableQuickAccess;

  public Clipboard = Clipboard;

  constructor(
    private quickAccessService: QAccessService,
    private quickAccessStore: QAccessStore,
    private toastCtrl: ToastController,
    public quickAccessQuery: QAccessQuery,
    private loadingCtrl: LoadingController,
    private sessionService: SessionService,
    private navCtrl: NavController,
    private notification: SwalHelper
  ) {}

  async ionViewWillEnter() {
    await this.quickAccessService.fetchWalletAddresses();
  }

  ngOnInit() {}

  async deleteAddress(address: QAccess) {
    this.notification.swal.fire({
      icon: 'warning',
      titleText: 'Delete Saved Wallet Address',
      text: 'Are you sure you want to delete this Wallet Address?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      showLoaderOnConfirm: true,
      confirmButtonColor: 'var(--ion-color-primary)',
      cancelButtonColor: 'var(--ion-color-medium)',
      reverseButtons: true,
      preConfirm: async () => {
        await this.quickAccessService.deleteAddress(address.walletAddress);
        this.quickAccessStore.remove(address.id);
        this.showSuccess('Wallet Address deleted');
      },
    });
  }

  async showSuccess(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color: 'success',
    });

    return toast.present();
  }

  login(address: string) {
    this.quickAccessService.setRememberWalletAddress(false);
    this.walletAddress = address;
    this.showPinEntryModal();
  }

  /** Show the PIN entry modal. */
  showPinEntryModal(): void {
    this.isPinEntryOpen = true;
  }

  /** User confirmed PIN: attempt to open wallet. */
  async onPinConfirmed(pin: string, address?: string): Promise<void> {
    if(!address) {return;}
    this.quickAccessService.setRememberWalletAddress(false);
    const openWalletErrorMessage = await withLoadingOverlayOpts(
      this.loadingCtrl,
      { message: 'Opening wallet…' },
      async () => await this.sessionService.openWallet(address, pin)
    );
    if (openWalletErrorMessage !== undefined) {
      await this.notification.swal.fire({
        icon: 'error',
        title: 'Open Wallet Failed',
        text: openWalletErrorMessage,
      });
      this.quickAccessService.setRememberWalletAddress(false);
    } else {
      await this.navCtrl.navigateRoot(['/wallet']);
    }
  }

  async notice(message: string): Promise<HTMLIonToastElement> {
    return showToast(this.toastCtrl, message, {
      color: 'success',
      duration: 2000,
    });
  }
}
