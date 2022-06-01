import { Component, Input, OnInit } from '@angular/core';
import { resetStores } from '@datorama/akita';
import { NavController } from '@ionic/angular';
import { SessionQuery } from 'src/app/state/session.query';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title = 'NAUTILUS';
  constructor(
    public sessionQuery: SessionQuery,
    private navController: NavController
  ) {}

  logoutAction() {
    resetStores({ exclude: ['connector'] });
    this.navController.navigateRoot('/');
  }

  ngOnInit() {}
}
