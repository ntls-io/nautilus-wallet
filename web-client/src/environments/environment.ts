// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // TODO(Pi): Use a modal switch for the choice of ledger to use, for now.
  ledger: 'XRP' as 'Algorand' | 'XRP',
  nautilusWalletServer: 'http://localhost:4200/api/nautilus/', // trailing slash matters
  // See `proxyConfig` in `angular.json`, and `proxy.conf.json`
  // Docs: https://angular.io/guide/build#proxying-to-a-backend-server
  algod: {
    // XXX: Algodv2's parameter handling is a bit weird: the HTTP port must be passed separately.
    baseServer: 'https://testnet-algorand.api.purestake.io/ps2',
    // baseServer: 'http://localhost/api/algorand',
    port: 443,
    // FIXME: Development key
    token: { 'X-API-Key': 'J7eo2jPb5m4OiBneIV6r0ajgRLeSaHqk3QplGETk' },
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
