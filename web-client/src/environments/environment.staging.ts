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
  staging: true,
  organization: 'nautilus',

  // Enable persistence for demo purposes.
  persistAkitaState: true,
  nautilusWalletServer: 'https://wallet-staging-api.ntls.io/',
  nautilusAssetServices: 'https://wallet-staging-services.ntls.io/',
  xrplClient: {
    server: 'wss://s.altnet.rippletest.net:51233',
    options: {
      connectionTimeout: 20000,
    },
  },
  commissionPercentage: 0.01,
  tokenIssuer: 'rpJv16Qmn2rQP6UC6UFsNRnVy5arkQihPP',
  tokenSymbol: 'FOO',
  xrpIssuer: 'rf9vKLZVsozsaUgU533W4BUj87TgzTqyQE',
  hideXrpBalance: false,
  autofundXrp: true,
  hidePullPayment: false,
  enableQuickAccess: true,
  autoLogout: true,
  autofundXrpAmount: 50,
  autofundAccountPin: 'K3VG-M@YQF9gzjq.DGW!',
  autofundXrpPublicKey:
    '028E00428D3EC7633234CF1047913524D03CE1FD122227DFD9CDD0967429758FE3',
};
