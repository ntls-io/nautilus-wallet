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
  production: true,
  organization: 'palau',

  // Enable persistence for demo purposes.
  persistAkitaState: true,
  nautilusWalletServer: 'https://wallet-palau-api.ntls.io/',
  nautilusAssetServices: 'https://wallet-palau-services.ntls.io/',
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
  tokenIssuer: 'rngdKd8BAM3etQcb12DvGxd5Ps9MocAvPa',
  tokenSymbol: 'PSC',
  xrpIssuer: 'rL6H7GSU2BaNmyxbJRbUdVhSNCT1FD3Z7a',
  hideXrpBalance: true,
  autofundXrp: true,
  autofundXrpAmount: 50,
  autofundAccountPin: '@CsmRxaR9UDXWfwy.rMv',
  autofundXrpPublicKey:
    '03E25AA05BC7F5BD0025C4622826426E0804DF1A7DA16CDE793AC1C7CC17275DD4',
};
