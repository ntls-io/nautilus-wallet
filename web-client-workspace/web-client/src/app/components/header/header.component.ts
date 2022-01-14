import { Component, Input, OnInit } from '@angular/core';
import { SessionQuery } from 'src/app/stores/session';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title = 'NAUTILUS';
  constructor(public sessionQuery: SessionQuery) {}

  ngOnInit() {}
}
