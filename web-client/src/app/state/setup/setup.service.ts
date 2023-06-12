import { Injectable } from '@angular/core';
import { App } from '@capacitor/app';
import {
  AppUpdate,
  AppUpdateAvailability,
} from '@capawesome/capacitor-app-update';
import { initializeApp } from 'firebase/app';
import {
  doc,
  DocumentSnapshot,
  getDoc,
  getFirestore,
} from 'firebase/firestore';
import { getBlob, getDownloadURL, getStorage, ref } from 'firebase/storage';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import { environment } from 'src/environments/environment';
import { SetupStore } from './setup.store';

@Injectable({ providedIn: 'root' })
export class SetupService {
  constructor(
    private setupStore: SetupStore,
    private notification: SwalHelper
  ) {}

  async iniFirebase() {
    initializeApp(environment.firebase);
  }

  async getAppInfo() {
    await App.getInfo().then((appInfo) => {
      this.setupStore.update({ appInfo });
    });
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

  async checkUpdate() {
    await AppUpdate.getAppUpdateInfo({ country: 'ZA' })
      .then(async ({ updateAvailability }) => {
        if (updateAvailability === AppUpdateAvailability.UPDATE_AVAILABLE) {
          await this.notification.swal
            .fire({
              icon: 'info',
              titleText: 'Update Available',
              text: 'A new version of the app is available. Please update to continue using the app.',
              confirmButtonText: 'Update',
            })
            .then(async (result) => {
              if (result.isConfirmed) {
                await AppUpdate.openAppStore();
              }
            });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async runSetup(org: any) {
    await this.iniFirebase();
    await this.loadSettings(org);
    await this.loadTheme(org);
    await this.loadLogo(org);
  }
}
