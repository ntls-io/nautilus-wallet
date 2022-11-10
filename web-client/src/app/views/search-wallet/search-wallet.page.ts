import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-wallet',
  templateUrl: './search-wallet.page.html',
  styleUrls: ['./search-wallet.page.scss'],
})
export class SearchWalletPage implements OnInit {
  @Input() name?: string | null;
  @Input() phone_number?: string | null;
  result?: (string | null | undefined)[];

  constructor() {}

  ngOnInit() {}

  searchWallet() {
    //const output_name = this.name;
    //const output_phone = this.phone_number;
    //console.log(output_name, output_phone);
    //return this.result;

    this.result = [this.name, this.phone_number];
    return this.result;
  }
}
