import { Environment } from 'src/environments/types';

export const environment: Environment = {
  production: true,
  // TODO: Production endpoint
  nautilusWalletServer: 'https://algo-api.registree.io/',
  nautilusAssetServices: 'https://ntls-services.registree.io/',

  algod: {
    baseServer: 'https://api.customer-one.xyz/ps2',
    port: '',
    token: { 'X-API-Key': 'xL4X4Gh9r163Pxx3tnF5K9KQYWGfpikB6wLsBnFJ' },
  },
  algorandTransactionUrlPrefix:
    'https://goalseeker.customer-one.xyz/c1/mainnet/transaction/',
  defaultAlgorandAssetId: 54398,
};
