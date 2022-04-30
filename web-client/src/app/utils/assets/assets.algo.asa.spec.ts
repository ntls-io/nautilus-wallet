import {
  assetAmountAlgo,
  LEDGER_INFO_ALGO,
  LEDGER_TYPE_ALGORAND,
} from './assets.algo';
import {
  AssetAmountAsa,
  assetAmountAsa,
  convertFromAssetAmountAsaToLedger,
  convertFromLedgerToAssetAmountAsa,
  isAssetAmountAsa,
  isLedgerInfoAsa,
  LedgerAmountAsa,
  ledgerInfoAsa,
  LedgerInfoAsa,
} from './assets.algo.asa';
import { assetAmountXrp, LEDGER_INFO_XRP } from './assets.xrp';

const exampleLedgerInfoAsa: LedgerInfoAsa = ledgerInfoAsa(5, 2);

const exampleAssetAmountAsa: AssetAmountAsa = assetAmountAsa(12.34, {
  assetSymbol: 'SPAM',
  assetId: exampleLedgerInfoAsa.assetId,
  decimals: exampleLedgerInfoAsa.decimals,
});

describe('ledgerInfoAsa', () => {
  it('constructs', () => {
    const expected: LedgerInfoAsa = {
      type: LEDGER_TYPE_ALGORAND,
      isAsa: true,
      assetId: 5,
      decimals: 2,
    };
    expect(exampleLedgerInfoAsa).toEqual(expected);
  });
});

describe('assetAmountAsa', () => {
  it('constructs', () => {
    const expected: AssetAmountAsa = {
      amount: 12.34,
      assetDisplay: { assetSymbol: 'SPAM', minDigits: 0, maxDigits: 2 },
      ledgerInfo: {
        decimals: 2,
        isAsa: true,
        type: LEDGER_TYPE_ALGORAND,
        assetId: 5,
      },
    };
    expect(
      assetAmountAsa(12.34, { assetSymbol: 'SPAM', assetId: 5, decimals: 2 })
    ).toEqual(expected);
  });
});

describe('isLedgerInfoAsa', () => {
  it('accepts ASA', () => {
    expect(isLedgerInfoAsa(exampleLedgerInfoAsa)).toBeTrue();
  });

  it('rejects Algo', () => {
    expect(isLedgerInfoAsa(LEDGER_INFO_ALGO)).toBeFalse();
  });

  it('rejects XRP', () => {
    expect(isLedgerInfoAsa(LEDGER_INFO_XRP)).toBeFalse();
  });
});

describe('isAssetAmountAsa', () => {
  it('accepts ASA', () => {
    expect(isAssetAmountAsa(exampleAssetAmountAsa)).toBeTrue();
  });

  it('rejects Algo', () => {
    expect(isAssetAmountAsa(assetAmountAlgo(1))).toBeFalse();
  });

  it('rejects XRP', () => {
    expect(isAssetAmountAsa(assetAmountXrp(1))).toBeFalse();
  });
});

describe('ledger conversion', () => {
  const exampleLedgerAmountAsa: LedgerAmountAsa = {
    amount: 1234,
    assetId: 5,
    decimals: 2,
    unitName: 'SPAM',
  };

  describe('convertFromLedgerToAssetAmountAsa', () => {
    it('works', () => {
      expect(convertFromLedgerToAssetAmountAsa(exampleLedgerAmountAsa)).toEqual(
        exampleAssetAmountAsa
      );
    });
  });
  describe('convertFromAssetAmountAsaToLedger', () => {
    it('works', () => {
      expect(convertFromAssetAmountAsaToLedger(exampleAssetAmountAsa)).toEqual(
        exampleLedgerAmountAsa
      );
    });
  });
});
