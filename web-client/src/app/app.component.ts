import { Component } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform
      .ready()
      .then(async () => {
        console.log('ready');
        this.loadTheme();
      })
      .finally(() => {});
  }

  async loadTheme() {
    const firebasestorage =
      'https://firebasestorage.googleapis.com/v0/b/wallet-setup.appspot.com/o';
    const url = `${firebasestorage}/${environment.organization}%2Fassets%2Ftheme.json?alt=media`;
    if (url) {
      await CapacitorHttp.get({ url }).then(({ data, status }) => {
        if (status === 200) {
          Object.keys(data.vars).forEach((k) => {
            document.body.style.setProperty(k, data.vars[k]);
          });
        }
      });
    }
  }
}
