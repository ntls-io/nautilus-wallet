import { Component, OnInit } from '@angular/core';
import { faLink, faQrcode } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-send-funds',
  templateUrl: './send-funds.page.html',
  styleUrls: ['./send-funds.page.scss'],
})
export class SendFundsPage implements OnInit {
  actionItems = [
    {
      label: 'Quick pay',
      title: 'Scan a QR code',
      icon: faQrcode,
    },
    {
      label: 'Add New Friend',
      title: 'Share my wallet address',
      icon: faLink,
    },
  ];

  constructor() {}

  ngOnInit() {}
}
