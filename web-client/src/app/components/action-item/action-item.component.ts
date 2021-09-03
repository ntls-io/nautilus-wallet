import { Component, Input, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-action-item',
  templateUrl: './action-item.component.html',
  styleUrls: ['./action-item.component.scss'],
})
export class ActionItemComponent implements OnInit {
  @Input() preTitle: string | undefined;
  @Input() title: string | undefined;
  @Input() icon: IconProp | undefined;
  @Input() path: string | undefined;
  @Input() disabled: boolean | undefined;
  @Input() url: string | undefined;

  constructor() {}

  ngOnInit() {}
}
