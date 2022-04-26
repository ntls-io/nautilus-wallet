import { assetAmountAlgo } from './assets.algo';
import {
  AssetAmount,
  formatAssetAmount,
  formatAssetSymbol,
} from './assets.common';
import { assetAmountXrp } from './assets.xrp';

describe('formatAssetSymbol', () => {
  describe('transforms', () => {
    const examples: [AssetAmount, string][] = [
      [assetAmountAlgo(0), 'ALGO'],
      [assetAmountXrp(0), 'XRP'],
    ];

    for (const [assetAmount, expected] of examples) {
      it(`${JSON.stringify(assetAmount)} → ${JSON.stringify(expected)}`, () => {
        expect(formatAssetSymbol(assetAmount)).toBe(expected);
      });
    }
  });
});

describe('formatAssetAmount', () => {
  describe('transforms', () => {
    const examples: [AssetAmount, string][] = [
      [assetAmountAlgo(-1), '-1'],
      [assetAmountAlgo(0), '0'],
      [assetAmountAlgo(1), '1'],
      [assetAmountAlgo(123.456), '123.456'],
      [assetAmountAlgo(123456.789), '123,456.789'],
      [assetAmountAlgo(1.23456789), '1.234568'], // Rounding

      [assetAmountXrp(-1), '-1'],
      [assetAmountXrp(0), '0'],
      [assetAmountXrp(1), '1'],
      [assetAmountXrp(123.456), '123.456'],
      [assetAmountXrp(123.456789), '123.456789'],
      [assetAmountAlgo(123456.789), '123,456.789'],
      [assetAmountXrp(1.23456789), '1.234568'], // Rounding
    ];

    for (const [assetAmount, expected] of examples) {
      it(`${JSON.stringify(assetAmount)} → ${JSON.stringify(expected)}`, () => {
        expect(formatAssetAmount(assetAmount)).toBe(expected);
      });
    }
  });
});
