import { IssuedCurrencyAmount } from 'xrpl/dist/npm/models/common/index';
import { assetAmountAlgo, LEDGER_INFO_ALGO } from './assets.algo';
import {
  assetAmountXrp,
  LEDGER_INFO_XRP,
  LEDGER_TYPE_XRPL,
} from './assets.xrp';
import {
  AssetAmountXrplToken,
  assetAmountXrplToken,
  convertFromAssetAmountXrplTokenToLedger,
  convertFromLedgerToAssetAmountXrplToken,
  isAssetAmountXrplToken,
  isLedgerInfoXrplToken,
  ledgerInfoXrplToken,
  LedgerInfoXrplToken,
} from './assets.xrp.token';

const exampleLedgerInfoXrplToken: LedgerInfoXrplToken = ledgerInfoXrplToken(
  'SPAM',
  'spammer'
);

const exampleAssetAmountXrplToken: AssetAmountXrplToken = assetAmountXrplToken(
  12.34,
  { currency: 'SPAM', issuer: 'spammer' }
);

describe('ledgerInfoXrplToken', () => {
  it('constructs', () => {
    const expected: LedgerInfoXrplToken = {
      type: LEDGER_TYPE_XRPL,
      isToken: true,
      currency: 'SPAM',
      issuer: 'spammer',
    };
    expect(exampleLedgerInfoXrplToken).toEqual(expected);
  });
});

describe('assetAmountXrplToken', () => {
  it('constructs', () => {
    const expected: AssetAmountXrplToken = {
      amount: 12.34,
      assetDisplay: { assetSymbol: 'SPAM', minDigits: 0, maxDigits: 3 },
      ledgerInfo: {
        type: LEDGER_TYPE_XRPL,
        isToken: true,
        currency: 'SPAM',
        issuer: 'spammer',
      },
    };
    expect(
      assetAmountXrplToken(12.34, { currency: 'SPAM', issuer: 'spammer' })
    ).toEqual(expected);
  });
});

describe('isLedgerInfoXrplToken', () => {
  it('accepts XRPL token', () => {
    expect(isLedgerInfoXrplToken(exampleLedgerInfoXrplToken)).toBeTrue();
  });

  it('rejects XRP', () => {
    expect(isLedgerInfoXrplToken(LEDGER_INFO_XRP)).toBeFalse();
  });

  it('rejects Algorand', () => {
    expect(isLedgerInfoXrplToken(LEDGER_INFO_ALGO)).toBeFalse();
  });
});

describe('isAssetAmountXrplToken', () => {
  it('accepts XRPL token', () => {
    expect(isAssetAmountXrplToken(exampleAssetAmountXrplToken)).toBeTrue();
  });

  it('rejects XRP', () => {
    expect(isAssetAmountXrplToken(assetAmountXrp(1))).toBeFalse();
  });

  it('rejects Algo', () => {
    expect(isAssetAmountXrplToken(assetAmountAlgo(1))).toBeFalse();
  });
});

describe('ledger conversion', () => {
  const exampleLedgerAmountXrplToken: IssuedCurrencyAmount = {
    currency: 'SPAM',
    issuer: 'spammer',
    value: '12.34',
  };

  describe('convertFromLedgerToAssetAmountXrplToken', () => {
    it('works', () => {
      expect(
        convertFromLedgerToAssetAmountXrplToken(exampleLedgerAmountXrplToken)
      ).toEqual(exampleAssetAmountXrplToken);
    });
  });
  describe('convertFromAssetAmountXrplTokenToLedger', () => {
    it('works', () => {
      expect(
        convertFromAssetAmountXrplTokenToLedger(exampleAssetAmountXrplToken)
      ).toEqual(exampleLedgerAmountXrplToken);
    });
  });
});
