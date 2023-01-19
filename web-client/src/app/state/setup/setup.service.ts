import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { initializeApp } from 'firebase/app';
import {
  doc,
  DocumentSnapshot,
  getDoc,
  getFirestore,
} from 'firebase/firestore';
import { getBlob, getDownloadURL, getStorage, ref } from 'firebase/storage';
import { environment } from 'src/environments/environment';
import { SetupStore } from './setup.store';

@Injectable({ providedIn: 'root' })
export class SetupService {
  constructor(private setupStore: SetupStore, private platform: Platform) {}

  async iniFirebase() {
    initializeApp(environment.firebase);
  }

  async loadSettings(org: string) {
    const store = getFirestore();
    const orgDoc = doc(store, 'organisations', org);
    await getDoc(orgDoc).then((document: DocumentSnapshot) => {
      if (document.exists()) {
        const dataData = document.data();
        if (dataData) {
          const data = environment?.staging
            ? dataData?.staging
            : dataData?.production;
          if (data) {
            this.setupStore.update(data);
          }
        }
      } else {
        console.log('No such document');
      }
    });
  }

  async loadLogo(org: string) {
    const storage = getStorage();
    const logoRef = ref(storage, `${org}/assets/logo.png`);

    await getDownloadURL(logoRef).then((logo: string) => {
      this.setupStore.update({ logo });
    });
  }

  async loadTheme(org: string) {
    const storage = getStorage();
    const themeRef = ref(storage, `${org}/assets/theme.json`);

    await getBlob(themeRef).then(async (blob: Blob) => {
      await blob.text().then((text: string) => {
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
