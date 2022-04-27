import {
  assetAmountXrp,
  AssetAmountXrp,
  ASSET_DISPLAY_XRP,
  convertFromAssetAmountXrpToLedger,
  convertFromLedgerToAssetAmountXrp,
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

describe('ledger conversion', () => {
  describe('convertFromLedgerToAssetAmountXrp', () => {
    it('works', () => {
      expect(convertFromLedgerToAssetAmountXrp('123456000')).toEqual(
        assetAmountXrp(123.456)
      );
    });
  });
  describe('convertFromAssetAmountXrpToLedger', () => {
    it('works', () => {
      expect(
        convertFromAssetAmountXrpToLedger(assetAmountXrp(123.456))
      ).toEqual('123456000');
    });
  });
});
