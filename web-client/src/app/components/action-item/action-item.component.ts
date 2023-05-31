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

/** A convenience type alias for {@link ActionItemComponent}'s inputs. */
export type ActionItem = Pick<
  ActionItemComponent,
  'preTitle' | 'title' | 'icon' | 'path' | 'disabled' | 'url'
>;
