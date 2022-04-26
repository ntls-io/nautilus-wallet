import {
  AssetAmountAsa,
  assetAmountAsa,
} from 'src/app/utils/assets/assets.algo.asa';
import { assetAmountXrp } from 'src/app/utils/assets/assets.xrp';
import {
  AssetAmountAlgo,
  assetAmountAlgo,
  ASSET_DISPLAY_ALGO,
  isAssetAmountAlgo,
  LEDGER_INFO_ALGORAND,
} from './assets.algo';

describe('assetAmountAlgo', () => {
  it('constructs', () => {
    const expected: AssetAmountAlgo = {
      amount: 0,
      assetDisplay: ASSET_DISPLAY_ALGO,
      ledgerInfo: LEDGER_INFO_ALGORAND,
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
