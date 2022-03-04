import { Component, OnInit } from '@angular/core';
import { faLink } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-receive',
  templateUrl: './receive.page.html',
  styleUrls: ['./receive.page.scss'],
})
export class ReceivePage implements OnInit {
  actionItems = [
    {
      preTitle: 'Connect & receive money',
      title: 'Share link to connect',
      icon: faLink,
      disabled: true,
    },
  ];

  constructor() {}

  ngOnInit() {}
}
