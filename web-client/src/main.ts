import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
  akitaConfig,
  enableAkitaProdMode,
  persistState,
} from '@datorama/akita';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  enableAkitaProdMode();
}

persistState({
  enableInNonBrowser: true,
  key: 'nautilus',
});

akitaConfig({ resettable: true });

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.log(err));
