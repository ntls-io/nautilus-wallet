import { Injectable } from '@angular/core';
import { FirebaseApp } from '@capacitor-firebase/app';
import { Platform } from '@ionic/angular';
import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { getBlob, getDownloadURL, getStorage, ref } from 'firebase/storage';
import { environment } from 'src/environments/environment';
import { SetupStore } from './setup.store';

@Injectable({ providedIn: 'root' })
export class SetupService {
  constructor(private setupStore: SetupStore, private platform: Platform) {}

  async iniFirebase() {
    if (this.platform.is('capacitor')) {
      const option = await FirebaseApp.getOptions();
      initializeApp(option);
      return;
    }
    initializeApp(environment.firebase);
  }

  async loadSettings(org: string) {
    const store = getFirestore();
    const orgDoc = doc(store, 'organisations', org);
    const docSnap = await getDoc(orgDoc);
    if (docSnap.exists()) {
      const data = docSnap.data();
      this.setupStore.update(data);
    }
  }

  async loadLogo(org: string) {
    const storage = getStorage();
    const logoRef = ref(storage, `${org}/assets/logo.png`);

    getDownloadURL(logoRef).then((logo) => {
      this.setupStore.update({ logo });
    });
  }

  async loadTheme(org: string) {
    const storage = getStorage();
    const themeRef = ref(storage, `${org}/assets/theme.json`);

    getBlob(themeRef).then((blob) => {
      blob.text().then((text) => {
        const theme = JSON.parse(text);
        Object.keys(theme?.vars).forEach((k) => {
          document.body.style.setProperty(k, theme.vars[k]);
        });
      });
    });
  }

  async runSetup(org: any) {
    await this.loadSettings(org);
    await this.loadTheme(org);
    await this.loadLogo(org);
  }
}
