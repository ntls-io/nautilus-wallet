import { Injectable, NgZone } from '@angular/core';
import { resetStores } from '@datorama/akita';
import { NavController } from '@ionic/angular';
import { SessionQuery } from 'src/app/state/session.query';
import { SessionStore } from 'src/app/state/session.store';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import { environment } from 'src/environments/environment';

const MINUTES_UNTIL_AUTO_LOGOUT = 1; // in mins
const CHECK_INTERVAL = 5000; // in ms
const STORE_KEY = 'lastAction';
@Injectable({
  providedIn: 'root',
})
export class AutoLogoutService {
  private autoLogoutEnabled = true;
  constructor(
    private navCtrl: NavController,
    private sessionStore: SessionStore,
    public sessionQuery: SessionQuery,
    private notification: SwalHelper,
    private ngZone: NgZone
  ) {
    if (environment.autoLogout) {
      localStorage.setItem(STORE_KEY, Date.now().toString());
      this.check();
      this.initListener();
      this.initInterval();
    }
  }
  public getLastAction() {
    return parseInt(localStorage.getItem(STORE_KEY) || '', 10);
  }
  public setLastAction(lastAction: number) {
    localStorage.setItem(STORE_KEY, lastAction.toString());
  }

  initListener() {
    this.ngZone.runOutsideAngular(() => {
      addEventListener('click', () => this.reset());
      addEventListener('mousemove', () => this.reset());
      addEventListener('keydown', () => this.reset());
      addEventListener('touchmove', () => this.reset());
    });
  }

  reset() {
    this.setLastAction(Date.now());
  }

  initInterval() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.check();
      }, CHECK_INTERVAL);
    });
  }

  public disableAutoLogout() {
    this.autoLogoutEnabled = false;
  }

  public enableAutoLogout() {
    this.autoLogoutEnabled = true;
  }

  check() {
    if (this.autoLogoutEnabled && this.sessionQuery.isActiveSession()) {
      const now = Date.now();
      const timeLeft =
        this.getLastAction() + MINUTES_UNTIL_AUTO_LOGOUT * 60 * 1000;
      const diff = timeLeft - now;
      const isTimeout = diff < 0;

      this.ngZone.run(() => {
        if (isTimeout) {
          this.cleanUp(true);
        }
      });
    }
  }

  public cleanUp(notification: boolean) {
    localStorage.removeItem(STORE_KEY);
    removeEventListener('click', () => this.reset());
    removeEventListener('mousemove', () => this.reset());
    removeEventListener('keydown', () => this.reset());
    removeEventListener('touchmove', () => this.reset());
    resetStores({ exclude: ['connector'] });
    if (notification) {
      this.notification.swal.fire({
        icon: 'warning',
        title: 'Automatic Logout',
        text: 'For your protection, you have been automatically logged out due to inactivity.',
      });
    }
    this.navCtrl.navigateRoot('/');
  }
}
