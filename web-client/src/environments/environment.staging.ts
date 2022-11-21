import { Environment } from 'src/environments/types';

export const environment: Environment = {
  firebase: {
    projectId: '',
    appId: '',
    databaseURL: '',
    storageBucket: '',
    locationId: '',
    apiKey: '',
    authDomain: '',
    messagingSenderId: '',
    measurementId: '',
  },
  production: true,
  organization: 'nautilus',

  // Enable persistence for demo purposes.
  persistAkitaState: true,
  nautilusWalletServer: 'https://wallet-staging-api.ntls.io/',
  nautilusAssetServices: 'https://wallet-staging-services.ntls.io/',
  algod: {
    baseServer: 'https://testnet-algorand.api.purestake.io/ps2',
    port: '',
    // FIXME: Development key
    token: { 'X-API-Key': 'J7eo2jPb5m4OiBneIV6r0ajgRLeSaHqk3QplGETk' },
  },
  // USDC from https://testnet.folks.finance/faucet
  defaultAlgorandAssetId: 67395862,
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
  autofundXrpAmount: 50,
  autofundAccountPin: 'K3VG-M@YQF9gzjq.DGW!',
  autofundXrpPublicKey:
    '028E00428D3EC7633234CF1047913524D03CE1FD122227DFD9CDD0967429758FE3',
};
