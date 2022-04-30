import {
  AssetAmountAlgo,
  assetAmountAlgo,
  ASSET_DISPLAY_ALGO,
  isAssetAmountAlgo,
  LEDGER_INFO_ALGO,
} from './assets.algo';
import { AssetAmountAsa, assetAmountAsa } from './assets.algo.asa';
import { assetAmountXrp } from './assets.xrp';

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
