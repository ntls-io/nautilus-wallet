import { Environment } from 'src/environments/types';

export const environment: Environment = {
  production: true,
  organization: 'bhutan',

  // Enable persistence for demo purposes.
  persistAkitaState: true,
  nautilusWalletServer: 'https://wallet-bhutan-api.ntls.io/',
  nautilusAssetServices: 'https://wallet-bhutan-services.ntls.io/',
  algod: {
    baseServer: 'https://testnet-algorand.api.purestake.io/ps2',
    port: '',
    // FIXME: Development key
    token: { 'X-API-Key': 'J7eo2jPb5m4OiBneIV6r0ajgRLeSaHqk3QplGETk' },
  },
  // USDC from https://testnet.folks.finance/faucet
  defaultAlgorandAssetId: 67395862,
  xrplClient: {
    server: 'wss://s1.cbdc-sandbox.rippletest.net',
    options: {
      connectionTimeout: 20000,
    },
  },
  commissionPercentage: 0.01,
  tokenIssuer: 'rKitZq2qY8REiq7xvY3MfaqMhQkMekJtK',
  tokenSymbol: 'BTN',
};
