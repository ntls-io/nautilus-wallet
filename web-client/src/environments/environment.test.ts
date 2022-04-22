// Config to allow the Karma tests to hit test-server-proxied endpoints.
//
// This is like the base development environment, but with the port set to 9876
// instead of 4200 to match the default port in karma.conf.js.
//
// (This file relies on a "fileReplacements" entry for the "test" command in angular.json.)
//
// XXX(Pi): Is there a better way to configure this?

import { Environment } from 'src/environments/types';

export const environment: Environment = {
  production: false,

  nautilusWalletServer: 'http://localhost:9876/api/nautilus/',
  nautilusAssetServices: 'http://localhost:9876/api/asset-services/',
  algod: {
    baseServer: 'http://localhost/api/algorand',
    port: 9876,
    token: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  },
};
