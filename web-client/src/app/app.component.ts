import { Component, OnInit } from '@angular/core';
import { WalletService } from './wallet.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private walletService: WalletService) {}

  ngOnInit() {
    this.getAttestationReport();
  }

  getAttestationReport() {
    this.walletService.getEnclaveReport().subscribe(
      (report) => console.log('getAttestationReport', report),
      (error) => console.error('getEnclaveReport failed:', error)
    );
  }
}
