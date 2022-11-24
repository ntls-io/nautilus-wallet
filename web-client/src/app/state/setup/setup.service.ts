import { Injectable } from '@angular/core';
import { FirebaseApp } from '@capacitor-firebase/app';
import { Platform } from '@ionic/angular';
import { FirebaseOptions, initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { getBlob, getDownloadURL, getStorage, ref } from 'firebase/storage';
import { environment } from 'src/environments/environment';
import { SetupStore } from './setup.store';

@Injectable({ providedIn: 'root' })
export class SetupService {
  constructor(private setupStore: SetupStore, private platform: Platform) {}

  async iniFirebase() {
    if (this.platform.is('capacitor')) {
      await FirebaseApp.getOptions().then((options) => {
        initializeApp(options);
      });
      return;
    }
    const config: FirebaseOptions = {
      projectId: environment.projectId,
      appId: environment.appId,
      databaseURL: environment.databaseURL,
      storageBucket: environment.storageBucket,
      apiKey: environment.apiKey,
      authDomain: environment.authDomain,
      messagingSenderId: environment.messagingSenderId,
      measurementId: environment.measurementId,
    };

    initializeApp(config);
  }

  async loadSettings(org: string) {
    const store = getFirestore();
    const orgDoc = doc(store, 'organisations', org);
    await getDoc(orgDoc).then((document) => {
      if (document.exists()) {
        this.setupStore.update(document.data());
      } else {
        console.log('No such document!');
      }
    });
  }

  async loadLogo(org: string) {
    const storage = getStorage();
    const logoRef = ref(storage, `${org}/assets/logo.png`);

    await getDownloadURL(logoRef).then((logo) => {
      this.setupStore.update({ logo });
    });
  }

  async loadTheme(org: string) {
    const storage = getStorage();
    const themeRef = ref(storage, `${org}/assets/theme.json`);

    await getBlob(themeRef).then(async (blob) => {
      await blob.text().then((text) => {
        const theme = JSON.parse(text);
        Object.keys(theme?.vars).forEach((k) => {
          document.body.style.setProperty(k, theme.vars[k]);
        });
      });
    });
  }

  async runSetup(org: any) {
    await this.iniFirebase();
    await this.loadSettings(org);
    await this.loadTheme(org);
    await this.loadLogo(org);
  }
}
