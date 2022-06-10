import { assetAmountAlgo } from './assets.algo';
import { assetAmountAsa } from './assets.algo.asa';
import {
  AssetAmount,
  formatAssetAmount,
  formatAssetSymbol,
  getAssetCommission,
} from './assets.common';
import { assetAmountXrp } from './assets.xrp';
import { assetAmountXrplToken } from './assets.xrp.token';

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

describe('getAssetCommission', () => {
  describe('calculates', () => {
    const commissionMultiplier = 0.01;
    const exampleNumbers: number[] = [
      -1, 0, 1, 123.456, 123456.789, 1.23456789,
    ];
    const assetExamples: ((amount: number) => AssetAmount)[] = [
      assetAmountAlgo,
      assetAmountXrp,
      (amount) =>
        assetAmountAsa(amount, {
          assetId: 1234,
          assetSymbol: 'TST',
          decimals: 5,
        }),
      (amount) =>
        assetAmountXrplToken(amount, { currency: 'TST', issuer: '123456abc' }),
    ];

    const exampleAssets: [AssetAmount, AssetAmount][] = assetExamples.flatMap(
      (assetFn) =>
        exampleNumbers.map((amount): [AssetAmount, AssetAmount] => [
          assetFn(amount),
          assetFn(amount * commissionMultiplier),
        ])
    );

    for (const [assetAmount, expected] of exampleAssets) {
      it(`${JSON.stringify(assetAmount)} → ${JSON.stringify(expected)}`, () => {
        expect(getAssetCommission(assetAmount)).toEqual(expected);
      });
    }
  });
});
