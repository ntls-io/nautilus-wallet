import { LEDGER_INFO_ALGO } from './assets.algo';
import { ledgerInfoAsa } from './assets.algo.asa';
import {
  assetAmountXrp,
  AssetAmountXrp,
  ASSET_DISPLAY_XRP,
  convertFromAssetAmountXrpToLedger,
  convertFromLedgerToAssetAmountXrp,
  isLedgerInfoXrp,
  LEDGER_INFO_XRP,
} from './assets.xrp';
import { ledgerInfoXrplToken } from './assets.xrp.token';

describe('assetAmountXrp', () => {
  it('constructs', () => {
    const expected: AssetAmountXrp = {
      amount: 0,
      assetDisplay: ASSET_DISPLAY_XRP,
      ledgerInfo: LEDGER_INFO_XRP,
    };
    expect(assetAmountXrp(0)).toEqual(expected);
  });
});

describe('isLedgerInfoXrp', () => {
  it('accepts Xrp', () => {
    expect(isLedgerInfoXrp(LEDGER_INFO_XRP)).toBeTrue();
  });

  it('rejects XRPL token', () => {
    expect(isLedgerInfoXrp(ledgerInfoXrplToken('SPAM', 'spammer'))).toBeFalse();
  });

  it('rejects Algo', () => {
    expect(isLedgerInfoXrp(LEDGER_INFO_ALGO)).toBeFalse();
  });

  it('rejects ASA', () => {
    expect(isLedgerInfoXrp(ledgerInfoAsa(5, 2))).toBeFalse();
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
