import { Component, OnInit } from '@angular/core';
import { faUserCircle, faWallet } from '@fortawesome/free-solid-svg-icons';
import { ActionItem } from 'src/app/components/action-item/action-item.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  actionItems: Array<ActionItem> = [
    {
      title: 'My Wallet',
      icon: faWallet,
      path: '../wallet',
    },
    {
      title: 'My Profile',
      icon: faUserCircle,
      disabled: true,
    },
  ];
  constructor() {}

  ngOnInit() {}
}
