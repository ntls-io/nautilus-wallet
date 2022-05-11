// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from 'src/environments/types';

export const environment: Environment = {
  production: false,

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
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
