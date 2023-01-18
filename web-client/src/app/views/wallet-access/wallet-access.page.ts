import { Component, Input, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import {
  LoadingController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { SessionService } from 'src/app/state/session.service';
import { defined } from 'src/app/utils/errors/panic';
import { withLoadingOverlayOpts } from 'src/app/utils/loading.helpers';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import { handleScan } from '../scanner.helpers';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wallet-access',
  templateUrl: './wallet-access.page.html',
  styleUrls: ['./wallet-access.page.scss'],
})
export class WalletAccessPage implements OnInit {
  /** @see showPinEntryModal */
  @Input() isPinEntryOpen = false;

  hasCamera?: boolean;

  /** @see validatedAddress */
  address?: string;

  hideSavedWalletAddress = environment.enableQuickAccess;

  constructor(
    // XXX: Capacitor.isPluginAvailable('Camera') depends on ScannerService, as a side effect.
    private modalCtrl: ModalController,
    private sessionService: SessionService,
    private notification: SwalHelper,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController
  ) {}

  /** Validated {@link address}, or `undefined`. */
  get validatedAddress(): string | undefined {
    const trimmed = this.address?.trim();
    return trimmed === '' ? undefined : trimmed;
  }

  ngOnInit(): void {
    // XXX: Capacitor.isPluginAvailable('Camera') depends on ScannerService, as a side effect.
    this.hasCamera = Capacitor.isPluginAvailable('Camera');
  }

  async openScanner(): Promise<void> {
    await handleScan(
      this.modalCtrl,
      this.notification.swal,
      this.confirmAddress
    );
  }

  /** User clicked to confirm address: show PIN entry. */
  async confirmAddress(): Promise<void> {
    if (this.validatedAddress !== undefined) {
      this.showPinEntryModal();
    } else {
      await this.notification.swal.fire({
        icon: 'warning',
        title: 'Invalid Address',
        text: 'Please input a valid wallet address',
      });
    }
  }

  /** Show the PIN entry modal. */
  showPinEntryModal(): void {
    this.isPinEntryOpen = true;
  }

  /** User confirmed PIN: attempt to open wallet. */
  async onPinConfirmed(pin: string): Promise<void> {
    const address = defined(
      this.validatedAddress,
      'WalletAccessPage.onPinConfirmed: unexpected invalid address'
    );
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
    } else {
      await this.navCtrl.navigateRoot(['/wallet']);
    }
  }
}
