import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { SessionQuery } from './stores/session';

@Injectable({
  providedIn: 'root',
})
export class OpenWalletGuard implements CanActivate {
  constructor(private sessionQuery: SessionQuery, private router: Router) {}
  canActivate(): true | UrlTree {
    const { name, walletId } = this.sessionQuery.getValue();
    if (name && walletId) {
      return true;
    } else {
      return this.router.parseUrl('/landing');
    }
  }
}
