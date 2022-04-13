import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-card-horizontal',
  templateUrl: './profile-card-horizontal.component.html',
  styleUrls: ['./profile-card-horizontal.component.scss'],
})
export class ProfileCardHorizontalComponent implements OnInit {
  @Input() title?: string;
  @Input() fullName?: string;
  @Input() cellphone?: string;
  @Input() avatar = 'assets/img/logo.svg';

  constructor() {}

  ngOnInit() {}
}
