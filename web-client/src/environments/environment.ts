// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from 'src/environments/types';

export const environment: Environment = {
  production: true,

  // Enable persistence for demo purposes.
  persistAkitaState: true,
  // TODO: Production endpoint
  nautilusWalletServer: 'https://ntls-api.registree.io/',
  nautilusAssetServices: 'https://ntls-services.registree.io/',
  algod: {
    baseServer: 'https://testnet-algorand.api.purestake.io/ps2',
    port: '',
    // FIXME: Development key
    token: { 'X-API-Key': 'J7eo2jPb5m4OiBneIV6r0ajgRLeSaHqk3QplGETk' },
  },
  xrplClient: {
    server: 'wss://s.altnet.rippletest.net/',
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
