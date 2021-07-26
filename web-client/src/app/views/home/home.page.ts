import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  actionItems = [
    {
      title: 'My Wallet',
      icon: 'wallet',
      path: 'wallet',
    },
    {
      title: 'My Profile',
      icon: 'person-circle',
    },
  ];
  constructor() {}

  ngOnInit() {}
}
