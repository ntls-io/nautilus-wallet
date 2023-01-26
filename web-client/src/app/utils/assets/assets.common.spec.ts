import { AssetAmount, formatAssetAmount } from './assets.common';
import { assetAmountXrp } from './assets.xrp';

describe('formatAssetAmount', () => {
  describe('transforms', () => {
    const examples: [AssetAmount, string][] = [
      [assetAmountXrp(-1), '-1'],
      [assetAmountXrp(0), '0'],
      [assetAmountXrp(1), '1'],
      [assetAmountXrp(123.456), '123.456'],
      [assetAmountXrp(123.456789), '123.456789'],
      [assetAmountXrp(1.23456789), '1.234568'], // Rounding
    ];

    for (const [assetAmount, expected] of examples) {
      it(`${JSON.stringify(assetAmount)} → ${JSON.stringify(expected)}`, () => {
        expect(formatAssetAmount(assetAmount)).toBe(expected);
      });
    }
  });
});
