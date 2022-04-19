import { Component, Input, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-action-item',
  templateUrl: './action-item.component.html',
  styleUrls: ['./action-item.component.scss'],
})
export class ActionItemComponent implements OnInit {
  @Input() preTitle?: string;
  @Input() title?: string;
  @Input() icon?: IconProp;
  @Input() path?: string;
  @Input() disabled?: boolean;
  @Input() url?: string;

  constructor() {}

  ngOnInit() {}
}
