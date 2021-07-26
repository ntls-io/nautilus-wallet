import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-action-item',
  templateUrl: './action-item.component.html',
  styleUrls: ['./action-item.component.scss'],
})
export class ActionItemComponent implements OnInit {
  @Input() title: string | undefined;
  @Input() icon: string | undefined;
  @Input() path: string | undefined;

  constructor() {}

  ngOnInit() {}
}
