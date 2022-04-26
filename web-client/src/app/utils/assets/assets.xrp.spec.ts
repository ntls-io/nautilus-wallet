import {
  assetAmountXrp,
  AssetAmountXrp,
  ASSET_DISPLAY_XRP,
  LEDGER_INFO_XRPL,
} from './assets.xrp';

describe('assetAmountXrp', () => {
  it('constructs', () => {
    const expected: AssetAmountXrp = {
      amount: 0,
      assetDisplay: ASSET_DISPLAY_XRP,
      ledgerInfo: LEDGER_INFO_XRPL,
    };
    expect(assetAmountXrp(0)).toEqual(expected);
  });
});
