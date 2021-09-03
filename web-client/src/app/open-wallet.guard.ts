import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { WalletQuery } from './wallet.query';

@Injectable({
  providedIn: 'root',
})
export class OpenWalletGuard implements CanActivate {
  constructor(private walletQuery: WalletQuery, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const sessionState = this.walletQuery.getValue();
    if (sessionState.name && sessionState.walletId) {
      return true;
    } else {
      return this.router.parseUrl('/landing');
    }
  }
}
