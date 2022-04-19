import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableAkitaProdMode, persistState } from '@datorama/akita';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  enableAkitaProdMode();
}

if (environment.persistAkitaState) {
  persistState({});
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.log(err));

defineCustomElements(window);
