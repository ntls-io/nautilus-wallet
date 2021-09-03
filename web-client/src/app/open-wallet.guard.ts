import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { SessionQuery } from 'src/app/stores/session/session.query';

@Injectable({
  providedIn: 'root',
})
export class OpenWalletGuard implements CanActivate {
  constructor(private sessionQuery: SessionQuery, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): true | UrlTree {
    const sessionState = this.sessionQuery.getValue();
    if (sessionState.name && sessionState.walletId) {
      return true;
    } else {
      return this.router.parseUrl('/landing');
    }
  }
}
