import { Component, Input, OnInit } from '@angular/core';
import { resetStores } from '@datorama/akita';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss'],
})
export class LogoutButtonComponent implements OnInit {
  @Input() title: boolean | undefined;
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  signOut() {
    resetStores({ exclude: ['connector'] });
    this.navCtrl.navigateRoot('/');
  }
}
