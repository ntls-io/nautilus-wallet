import {
  algoAmount,
  AssetAmount,
  formatAssetAmount,
  formatAssetSymbol,
  xrpAmount,
} from 'src/app/utils/asset.display';

describe('formatAssetSymbol', () => {
  describe('transforms', () => {
    const examples: [AssetAmount, string][] = [
      [algoAmount(0), 'ALGO'],
      [xrpAmount(0), 'XRP'],
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
      [algoAmount(-1), '-1'],
      [algoAmount(0), '0'],
      [algoAmount(1), '1'],
      [algoAmount(123.456), '123.456'],
      [algoAmount(123456.789), '123,456.789'],
      [algoAmount(1.23456789), '1.234568'], // Rounding

      [xrpAmount(-1), '-1'],
      [xrpAmount(0), '0'],
      [xrpAmount(1), '1'],
      [xrpAmount(123.456), '123.456'],
      [xrpAmount(123.456789), '123.456789'],
      [algoAmount(123456.789), '123,456.789'],
      [xrpAmount(1.23456789), '1.234568'], // Rounding
    ];

    for (const [assetAmount, expected] of examples) {
      it(`${JSON.stringify(assetAmount)} → ${JSON.stringify(expected)}`, () => {
        expect(formatAssetAmount(assetAmount)).toBe(expected);
      });
    }
  });
});
