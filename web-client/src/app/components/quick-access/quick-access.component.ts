import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quick-access',
  templateUrl: './quick-access.component.html',
  styleUrls: ['./quick-access.component.scss'],
})
export class QuickAccessComponent implements OnInit {

  savedAddress = [
    {name: 'Isco', walletAddress: 'rhDanuXviGtZB7Zo3NNN5Qozx7ssY4nVCe'},
    {name: 'Don', walletAddress: 'rhDanuXviGtZB7Zo3NNN5Qozx7ssY4nVCe'},
    {name: 'John', walletAddress: 'rhDanuXviGtZB7Zo3NNN5Qozx7ssY4nVCe'},
    {name: 'Jane', walletAddress: 'rhDanuXviGtZB7Zo3NNN5Qozx7ssY4nVCe'},
  ];

  constructor() { }

  ngOnInit() {}

  deleteAddress(){
    console.log('Delete Adress!');
  }

}
