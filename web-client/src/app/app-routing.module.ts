import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// XXX(Pi): prettier ignore to work around compodoc bug: https://github.com/compodoc/compodoc/issues/954#issuecomment-708987583
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'wallet',
    loadChildren: () =>
      import('./views/wallet/wallet.module').then(
        m => m.WalletPageModule // prettier-ignore
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./views/login/login.module').then(
        m => m.LoginPageModule // prettier-ignore
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./views/register/register.module').then(
        m => m.RegisterPageModule // prettier-ignore
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
