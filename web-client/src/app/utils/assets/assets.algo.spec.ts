import {
  AssetAmountAlgo,
  assetAmountAlgo,
  ASSET_DISPLAY_ALGO,
  isAssetAmountAlgo,
  isLedgerInfoAlgo,
  LEDGER_INFO_ALGO,
} from './assets.algo';
import {
  AssetAmountAsa,
  assetAmountAsa,
  ledgerInfoAsa,
} from './assets.algo.asa';
import { assetAmountXrp, LEDGER_INFO_XRP } from './assets.xrp';

describe('assetAmountAlgo', () => {
  it('constructs', () => {
    const expected: AssetAmountAlgo = {
      amount: 0,
      assetDisplay: ASSET_DISPLAY_ALGO,
      ledgerInfo: LEDGER_INFO_ALGO,
    };
    expect(assetAmountAlgo(0)).toEqual(expected);
  });
});

describe('isLedgerInfoAlgo', () => {
  it('accepts Algo', () => {
    expect(isLedgerInfoAlgo(LEDGER_INFO_ALGO)).toBeTrue();
  });

  it('rejects ASA', () => {
    expect(isLedgerInfoAlgo(ledgerInfoAsa(5, 2))).toBeFalse();
  });

  it('rejects XRPL', () => {
    expect(isLedgerInfoAlgo(LEDGER_INFO_XRP)).toBeFalse();
  });
});

describe('isAssetAmountAlgo', () => {
  it('accepts Algo', () => {
    expect(isAssetAmountAlgo(assetAmountAlgo(1))).toBeTrue();
  });

  it('rejects ASA', () => {
    const amountAsa: AssetAmountAsa = assetAmountAsa(1, {
      assetSymbol: 'X',
      assetId: 5,
      decimals: 2,
    });
    expect(isAssetAmountAlgo(amountAsa)).toBeFalse();
  });

  it('rejects XRP', () => {
    expect(isAssetAmountAlgo(assetAmountXrp(1))).toBeFalse();
  });
});
