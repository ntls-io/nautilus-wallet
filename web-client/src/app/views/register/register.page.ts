import { Component, OnInit } from '@angular/core';
import { CreateWallet } from '../../../schema/actions';
import { WalletService } from '../../wallet.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  constructor(private walletService: WalletService) {}

  ngOnInit() {
    const request: CreateWallet = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      auth_pin: '1234',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      owner_name: 'Test Owner',
    };

    this.walletService
      .createWallet(request)
      .subscribe((created) => console.log('XXX created!', created));
  }
}
