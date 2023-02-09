// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from 'src/environments/types';

export const environment: Environment = {
  firebase: {
    projectId: 'wallet-setup',
    appId: '1:907972056790:web:18c0095eccf21eedf15b77',
    databaseURL:
      'https://wallet-setup-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'wallet-setup.appspot.com',
    apiKey: 'AIzaSyDPq5JcM2dVVYisvvqANjJipKInkMdy_zc',
    authDomain: 'wallet-setup.firebaseapp.com',
    messagingSenderId: '907972056790',
    measurementId: 'G-TW4DGPTJ62',
  },
  production: false,
  staging: true,
  organization: 'nautilus',

  // Enable persistence for easier development.
  persistAkitaState: true,

  nautilusWalletServer: 'http://localhost:4200/api/nautilus/',
  nautilusAssetServices: 'http://localhost:4200/api/asset-services/',
  // See `proxyConfig` in `angular.json`, and `proxy.conf.json`
  // Docs: https://angular.io/guide/build#proxying-to-a-backend-server
  algod: {
    // XXX: Algodv2's parameter handling is a bit weird: the HTTP port must be passed separately.
    baseServer: 'http://localhost/api/algorand',
    port: 4200,
    // FIXME: Development key
    token: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  },

  xrplClient: {
    server: 'ws://localhost:4200/api/xrpl',
    options: {
      connectionTimeout: 20000,
    },
  },
  commissionPercentage: 0.01,
  tokenIssuer: 'rpJv16Qmn2rQP6UC6UFsNRnVy5arkQihPP',
  tokenSymbol: 'FOO',
  xrpIssuer: 'rf9vKLZVsozsaUgU533W4BUj87TgzTqyQE',
  hideXrpBalance: false,
  autofundXrp: false,
  hidePullPayment: false,
  enableQuickAccess: true,
  enablePinReset: true,
  autoLogout: false,
  autofundXrpAmount: 50,
  autofundAccountPin: 'K3VG-M@YQF9gzjq.DGW!',
  autofundXrpPublicKey:
    '028E00428D3EC7633234CF1047913524D03CE1FD122227DFD9CDD0967429758FE3',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
