import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-card-horizontal',
  templateUrl: './profile-card-horizontal.component.html',
  styleUrls: ['./profile-card-horizontal.component.scss'],
})
export class ProfileCardHorizontalComponent implements OnInit {
  @Input() owner_name?: string;
  @Input() phone_number?: string;
  @Input() isVerified?: boolean | null;

  constructor() {}

  ngOnInit() {}
}
