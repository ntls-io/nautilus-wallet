import { Environment } from 'src/environments/types';

export const environment: Environment = {
  production: true,
  // TODO: Production endpoint
  nautilusWalletServer: 'https://ntls-api.registree.io/',
  nautilusAssetServices: 'https://ntls-services.registree.io/',
  algod: {
    baseServer: 'https://testnet-algorand.api.purestake.io/ps2',
    port: '',
    // FIXME: Development key
    token: { 'X-API-Key': 'J7eo2jPb5m4OiBneIV6r0ajgRLeSaHqk3QplGETk' },
  },
  
  xrplClient: {
    server: 'wss://s.altnet.rippletest.net/',
  },
};
