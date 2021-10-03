import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SessionQuery } from 'src/app/stores/session/session.query';

@Injectable({
  providedIn: 'root',
})
export class OpenWalletGuard implements CanActivate {
  constructor(private sessionQuery: SessionQuery, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const sessionState = this.sessionQuery.getValue();
    if (sessionState.name && sessionState.walletId) {
      return true;
    } else {
      return this.router.parseUrl('/landing');
    }
  }
}
