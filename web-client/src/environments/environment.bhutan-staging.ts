import { Environment } from 'src/environments/types';

export const environment: Environment = {
  firebase: {
    projectId: 'wallet-setup',
    appId: '1:907972056790:web:18c0095eccf21eedf15b77',
    databaseURL:
      'https://wallet-setup-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'wallet-setup.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyDPq5JcM2dVVYisvvqANjJipKInkMdy_zc',
    authDomain: 'wallet-setup.firebaseapp.com',
    messagingSenderId: '907972056790',
    measurementId: 'G-TW4DGPTJ62',
  },
  production: true,
  organization: 'bhutan',

  // Enable persistence for demo purposes.
  persistAkitaState: true,
  nautilusWalletServer: 'https://wallet-bhutan-staging-api.ntls.io/',
  nautilusAssetServices: 'https://wallet-bhutan-staging-services.ntls.io/',
  algod: {
    baseServer: 'https://testnet-algorand.api.purestake.io/ps2',
    port: '',
    // FIXME: Development key
    token: { 'X-API-Key': 'J7eo2jPb5m4OiBneIV6r0ajgRLeSaHqk3QplGETk' },
  },
  // USDC from https://testnet.folks.finance/faucet
  defaultAlgorandAssetId: 67395862,
  xrplClient: {
    server: 'wss://s1.cbdc-sandbox.rippletest.net:51233',
    options: {
      connectionTimeout: 20000,
    },
  },
  commissionPercentage: 0.0,
  tokenIssuer: 'rKitZq2qY8REiq7xvY3MfaqMhQkMekJtK',
  tokenSymbol: 'BTN',
  xrpIssuer: 'rpd17stoaELtzuhxEn4eAQcipXy2w8DEXQ',
  hideXrpBalance: true,
  autofundXrp: false,
  autofundXrpAmount: 50,
  autofundAccountPin: 'L4b@Rr.ei7UAV26ZR!r6',
  autofundXrpPublicKey:
    '03EE5AA3E95486138DFAD5C389E5A3E98A25DFC5BD331588C73EB30657BF7701E5',
};
