import { Component, OnInit } from '@angular/core';
import { faUserCircle, faWallet } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  actionItems = [
    {
      title: 'My Wallet',
      icon: faWallet,
      path: 'wallet',
    },
    {
      title: 'My Profile',
      icon: faUserCircle,
    },
  ];
  constructor() {}

  ngOnInit() {}
}
