import { Environment } from 'src/environments/types';

export const environment: Environment = {
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
  hideXrpBalance: false,
  autofundXrp: true,
  autofundXrpAmount: 11,
  autofundAccountPin: "L4b@Rr.ei7UAV26ZR!r6",
  xrpPublicKey: "03EE5AA3E95486138DFAD5C389E5A3E98A25DFC5BD331588C73EB30657BF7701E5"
};
