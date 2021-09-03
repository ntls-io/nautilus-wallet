import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { WalletQuery } from './wallet.query';

@Injectable({
  providedIn: 'root',
})
export class OpenWalletGuard implements CanActivate {
  constructor(private walletQuery: WalletQuery, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): true | UrlTree {
    const sessionState = this.walletQuery.getValue();
    if (sessionState.name && sessionState.walletId) {
      return true;
    } else {
      return this.router.parseUrl('/landing');
    }
  }
}
