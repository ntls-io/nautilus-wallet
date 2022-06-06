import { Component, OnInit } from '@angular/core';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { ActionItem } from 'src/app/components/action-item/action-item.component';
import { SessionQuery } from 'src/app/state/session.query';

@Component({
  selector: 'app-receive',
  templateUrl: './receive.page.html',
  styleUrls: ['./receive.page.scss'],
})
export class ReceivePage implements OnInit {
  actionItems: ActionItem[] = [
    {
      preTitle: 'Connect & receive money',
      title: 'Share link to connect',
      icon: faLink,
      disabled: true,
    },
  ];

  constructor(public sessionQuery: SessionQuery) {}

  ngOnInit() {}
}
