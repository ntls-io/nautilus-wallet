import { Component, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { ScannerService } from 'src/app/services/scanner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wallet-access',
  templateUrl: './wallet-access.page.html',
  styleUrls: ['./wallet-access.page.scss'],
})
export class WalletAccessPage implements OnInit {
  hasCamera: boolean | undefined;
  address: string;

  constructor(private scannerService: ScannerService) {}

  ngOnInit() {
    this.hasCamera = Capacitor.isPluginAvailable('Camera');
  }

  async openScanner() {
    const permission = await this.scannerService.checkPermissions();
    console.log(permission);
    if (permission === 'granted') {
      this.scannerService.presentScanner();
    } else {
      const granted = await this.scannerService.requestPermissions();
      if (granted) {
        this.openScanner();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Permission required',
          text: `In order to scan a QR Code, you need to grant camera's permission`,
          confirmButtonColor: 'var(--ion-color-primary)',
          backdrop: true,
          heightAuto: false,
          allowOutsideClick: false,
        });
      }
    }
  }

  confirm() {
    this.address = this.address.trim();
    if (this.address) {
      this.scannerService.presentLock(this.address);
    }
  }
}
