import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AutoLogoutService } from 'src/app/services/auto-logout.service';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss'],
})
export class LogoutButtonComponent implements OnInit {
  @Input() title: boolean | undefined;
  constructor(
    private navCtrl: NavController,
    private autoLogoutService: AutoLogoutService
  ) {}

  ngOnInit() {}

  signOut() {
    this.autoLogoutService.cleanUp(false);
  }
}
