import { Component, Input, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import {
  LoadingController,
  ModalController,
  NavController,
} from '@ionic/angular';
import algosdk from 'algosdk';
import { SessionService } from 'src/app/state/session.service';
import { defined } from 'src/app/utils/errors/panic';
import { withLoadingOverlayOpts } from 'src/app/utils/loading.helpers';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import { environment } from 'src/environments/environment';
import * as xrpl from 'xrpl';
import { handleScan } from '../scanner.helpers';
import { QAccessService } from 'src/app/state/qAccess';


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
    private loadingCtrl: LoadingController,
    private quickAccessService: QAccessService
  ) {}

  /** Validated {@link address}, or `undefined`. */
  get validatedAddress(): string | undefined {
    const trimmed = this.address?.trim();
    return trimmed === '' ? undefined : trimmed;
  }

  get validAddressType(): AddressType | undefined {
    return this.validatedAddress
      ? addressType(this.validatedAddress)
      : undefined;
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
    if (
      this.validatedAddress !== undefined &&
      this.validAddressType !== undefined
    ) {
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
      this.quickAccessService.setRememberWalletAddress(false);
    } else {
      if (this.quickAccessService.getRememberWalletAddress()){
        this.quickAccessService.saveQuickAccess(this.address);
        this.quickAccessService.setRememberWalletAddress(false);
      };
      await this.navCtrl.navigateRoot(['/wallet']);
    }
  }
}

type AddressType = 'Algorand' | 'XRPL';

const addressTypes = (address: string): AddressType[] => {
  const coerce = (t: AddressType[]) => t;
  return [
    ...coerce(algosdk.isValidAddress(address) ? ['Algorand'] : []),
    ...coerce(xrpl.isValidAddress(address) ? ['XRPL'] : []),
  ];
};

const addressType = (address: string): AddressType | undefined => {
  const types = addressTypes(address);
  switch (types.length) {
    case 0:
      return undefined;
    case 1:
      return types[0];
    default:
      throw Error(
        `addressType: ${JSON.stringify(
          types
        )} has multiple types: ${JSON.stringify(types)}`
      );
  }
};
