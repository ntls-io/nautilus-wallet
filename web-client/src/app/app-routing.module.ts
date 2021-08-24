import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// XXX(Pi): prettier ignore to work around compodoc bug: https://github.com/compodoc/compodoc/issues/954#issuecomment-708987583
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'akita',
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
    path: 'akita',
    loadChildren: () =>
      import('./views/akita/akita.module').then((m) => m.AkitaPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
