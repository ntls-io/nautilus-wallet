import { Component } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { SetupService } from './state/setup';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  logo: string | undefined;
  constructor(private platform: Platform, private setupService: SetupService) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform
      .ready()
      .then(async () => {
        await this.setupService.runSetup(environment.organization);
      })
      .finally(() => {
        if (this.platform.is('capacitor')) {
          SplashScreen.hide({ fadeOutDuration: 500 });
        }
      });
  }
}
