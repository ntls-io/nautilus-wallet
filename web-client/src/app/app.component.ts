import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CapacitorHttp } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { SetupStore } from './state/setup';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private afs: AngularFirestore,
    private setupStore: SetupStore
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform
      .ready()
      .then(async () => {
        await this.loadTheme(environment.organization);
        await this.loadSettings(environment.organization);
      })
      .finally(() => {
        if (this.platform.is('capacitor')) {
          SplashScreen.hide({ fadeOutDuration: 500 });
        }
      });
  }

  async loadTheme(organization: string) {
    const firebasestorage =
      'https://firebasestorage.googleapis.com/v0/b/wallet-setup.appspot.com/o';
    const url = `${firebasestorage}/${organization}%2Fassets%2Ftheme.json?alt=media`;
    if (url) {
      return await CapacitorHttp.get({ url }).then(({ data, status }) => {
        if (status === 200) {
          Object.keys(data.vars).forEach((k) => {
            document.body.style.setProperty(k, data.vars[k]);
          });
        }
      });
    }
  }

  loadSettings(org: string) {
    const orgDoc = this.afs.doc(`organisations/${org}`);
    const orgData = orgDoc.valueChanges();
    orgData.subscribe((data: any) => {
      this.setupStore.update(data);
    });
  }
}
