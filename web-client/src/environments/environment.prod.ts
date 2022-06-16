import { Environment } from 'src/environments/types';

export const environment: Environment = {
  production: true,

  // TODO: Production endpoint
  nautilusWalletServer: 'https://wallet-demo-api.ntls.io/',
  nautilusAssetServices: 'https://wallet-demo-services.ntls.io/',
  algod: {
    // TODO: Mainnet endpoint
    baseServer: 'https://testnet-algorand.api.purestake.io/ps2',
    port: '',
    // FIXME: Development key
    token: { 'X-API-Key': 'J7eo2jPb5m4OiBneIV6r0ajgRLeSaHqk3QplGETk' },
  },
  // USDC from https://testnet.folks.finance/faucet
  defaultAlgorandAssetId: 67395862,
  // TODO: Mainnet endpoint
  xrplClient: {
    server: 'wss://s.altnet.rippletest.net/',
    options: {
      connectionTimeout: 20000,
    },
  },
  commissionPercentage: 0.01,
};
