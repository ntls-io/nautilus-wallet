import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { OpenWalletGuard } from './open-wallet.guard';

// XXX(Pi, 2021-07-05): prettier ignore to work around compodoc bug: https://github.com/compodoc/compodoc/issues/954#issuecomment-708987583
// XXX(Pi, 2021-10-07): Is this workaround still needed?
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: 'wallet',
    loadChildren: () =>
      import('./views/wallet/wallet.module').then(
        m => m.WalletPageModule // prettier-ignore
      ),
    canActivate: [OpenWalletGuard],
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./views/register/register.module').then(
        m => m.RegisterPageModule // prettier-ignore
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./views/home/home.module').then(
        m => m.HomePageModule // prettier-ignore
      ),
  },
  {
    path: 'landing',
    loadChildren: () =>
      import('./views/landing/landing.module').then(
        m => m.LandingPageModule // prettier-ignore
      ),
  },
  {
    path: 'print-wallet',
    loadChildren: () =>
      import('./views/print-wallet/print-wallet.module').then(
        (m) => m.PrintWalletPageModule // prettier-ignore
      ),
  },
  {
    path: 'scanner',
    loadChildren: () =>
      import('./views/scanner/scanner.module').then(
        m => m.ScannerPageModule // prettier-ignore
      ),
  },
  {
    path: 'wallet-access',
    loadChildren: () =>
      import('./views/wallet-access/wallet-access.module').then(
        (m) => m.WalletAccessPageModule //prettier-ignore
      ),
  },
  {
    path: 'pay',
    loadChildren: () =>
      import('./views/pay/pay.module').then((m) => m.PayPageModule),
    canActivate: [OpenWalletGuard],
  },
  {
    path: 'manual-address',
    loadChildren: () =>
      import('./views/manual-address/manual-address.module').then(
        (m) => m.ManualAddressPageModule
      ),
  },
  {
    path: 'kyc',
    loadChildren: () =>
      import('./views/kyc/kyc.module').then((m) => m.KycPageModule),
  },
  {
    path: 'delete-user',
    loadChildren: () =>
      import('./views/delete-user/delete-user.module').then(
        (m) => m.DeleteUserPageModule
      ),
  },
  {
    path: 'deposit-funds',
    loadChildren: () =>
      import('./views/deposit-funds/deposit-funds.module').then(
        (m) => m.DepositFundsPageModule
      ),
  },
  {
    path: 'become-connector',
    loadChildren: () =>
      import('./views/become-connector/become-connector.module').then(
        (m) => m.BecomeConnectorPageModule
      ),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./views/settings/settings.module').then(
        (m) => m.SettingsPageModule
      ),
  },
  {
    path: 'pin-reset',
    loadChildren: () =>
      import('./views/pin-reset/pin-reset.module').then(
        (m) => m.PinResetPageModule
      ),
  },
  {
    path: 'search-wallet',
    loadChildren: () =>
      import('./views/search-wallet/search-wallet.module').then(
        (m) => m.SearchWalletPageModule
      ),
  },
  {
    path: 'history',
    loadChildren: () =>
      import('./views/history/history.module').then((m) => m.HistoryPageModule),
  },
  {
    path: 'bookmarks',
    loadChildren: () =>
      import('./views/bookmarks/bookmarks.module').then(
        (m) => m.BookmarksPageModule
      ),
  },
  {
    path: 'pull',
    loadChildren: () =>
      import('./views/pull/pull.module').then((m) => m.PullPageModule),
  },
  {
    path: '2FA',
    loadChildren: () =>
      import(
        './views/two-factor-authentication/two-factor-authentication.module'
      ).then((m) => m.TwoFactorAuthenticationPageModule),
  },
  {
    path: 'triggers',
    loadChildren: () =>
      import('./views/triggers/triggers.module').then(
        (m) => m.TriggersPageModule
      ),
  },
  {
    path: 'recurring-pay',
    loadChildren: () =>
      import('./views/recurring-pay/recurring-pay.module').then(
        (m) => m.RecurringPayPageModule
      ),
  },
  {
    path: 'schedule-pay',
    loadChildren: () =>
      import('./views/schedule-pay/schedule-pay.module').then(
        (m) => m.SchedulePayPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
