import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableAkitaProdMode } from '@datorama/akita';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  enableAkitaProdMode();
}

// persistState({
//   enableInNonBrowser: true,
//   key: 'nautilus',
// });

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.log(err));

defineCustomElements(window);
