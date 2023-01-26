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
  xrplClient: {
    server: 'wss://s1.ripple.com:51233',
    options: {
      connectionTimeout: 20000,
    },
  },
  commissionPercentage: 0.0,
  tokenIssuer: 'rwekfW4MiS5yZjXASRBDzzPPWYKuHvKP7E',
  tokenSymbol: 'PSC',
  xrpIssuer: 'r3xUVoiRsww3SpPhkYaPfhNZ52K8KP5rEc',
  hideXrpBalance: true,
  autofundXrp: true,
  hidePullPayment: true,
  enableQuickAccess: false,
  autoLogout: false,
  autofundXrpAmount: 50,
  autofundAccountPin: '@CsmRxaR9UDXWfwy.rMv',
  autofundXrpPublicKey:
    '0283F89740510C965195EC9DD539D612D26DB9A44531B23C4830C066476E25B7F3',
};
