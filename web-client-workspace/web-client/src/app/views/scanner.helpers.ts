import { ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import Swal from 'sweetalert2';
import { never } from '../../helpers/helpers';
import { ScannerPage, ScanResult } from './scanner/scanner.page';

export const handleScan = async (
  modalCtrl: ModalController,
  swal: typeof Swal,
  scanSuccess: (address: string) => Promise<void>
): Promise<void> => {
  // FIXME: fix import for OverlayEventDetail
  // const dismissed = async (eventDetail: { data?: ScanResult }) => {
  const dismissed = async (
    eventDetail: OverlayEventDetail<ScanResult>
  ): Promise<void> => {
    const { data: result } = eventDetail;
    switch (result?.type) {
      case 'scanSuccess':
        await scanSuccess(result.result);
        break;
      case 'scanError':
        await swal.fire({
          icon: 'error',
          title: 'Error scanning QR code',
          text: 'Failed to scan a valid QR code. Please try again.',
        });
        break;
      case 'camerasNotFound':
        await swal.fire({
          icon: 'warning',
          title: 'No camera found',
          text: 'In order to scan a QR Code, your device must have a camera',
        });
        break;
      case 'permissionDenied':
        await swal.fire({
          icon: 'error',
          title: 'Permission required',
          text: `In order to scan a QR Code, you need to grant camera's permission`,
        });
        break;
      case 'dismissed':
        // Explicit user dismiss: just return silently.
        break;
      case undefined:
        throw Error('ScannerPage modal dismiss returned unexpected undefined!');
      default:
        never(result);
    }
  };

  // Show modal
  const scanner = await modalCtrl.create({ component: ScannerPage });
  const didDismissPromise = scanner.onDidDismiss();

  await scanner.present();
  await dismissed(await didDismissPromise);
};
