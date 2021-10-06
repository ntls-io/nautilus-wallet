export const environment = {
  production: true,
  // TODO(Pi): Use a modal switch for the choice of ledger to use, for now.
  ledger: 'XRP' as 'Algorand' | 'XRP',
  // TODO: Production endpoint
  nautilusWalletServer: 'https://ntls-api.registree.io/',
  algod: {
    baseServer: 'https://testnet-algorand.api.purestake.io/ps2',
    port: '',
    // FIXME: Development key
    token: { 'X-API-Key': 'J7eo2jPb5m4OiBneIV6r0ajgRLeSaHqk3QplGETk' },
  },
};
