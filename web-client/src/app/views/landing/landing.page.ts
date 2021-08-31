import { Component, OnInit } from '@angular/core';
import { resetStores } from '@datorama/akita';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  constructor() {
    resetStores();
  }

  ngOnInit() {}
}
