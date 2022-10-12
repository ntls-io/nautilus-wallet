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
    const url = environment?.themeUrl;
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
