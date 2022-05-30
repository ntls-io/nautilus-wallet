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
    path: 'become-connector',
    loadChildren: () =>
      import('./views/become-connector/become-connector.module').then(
        (m) => m.BecomeConnectorPageModule
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
