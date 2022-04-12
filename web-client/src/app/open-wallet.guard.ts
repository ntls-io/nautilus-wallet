import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { SessionQuery } from 'src/app/state/session.query';

@Injectable({
  providedIn: 'root',
})
export class OpenWalletGuard implements CanActivate {
  constructor(private sessionQuery: SessionQuery, private router: Router) {}
  canActivate(): true | UrlTree {
    if (this.sessionQuery.isActiveSession()) {
      return true;
    } else {
      return this.router.parseUrl('/landing');
    }
  }
}
