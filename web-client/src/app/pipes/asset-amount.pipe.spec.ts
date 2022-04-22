import { algoAmount, xrpAmount } from 'src/app/utils/asset.display';
import { AssetAmountPipe } from './asset-amount.pipe';

describe('AssetAmountPipe', () => {
  let pipe: AssetAmountPipe;

  beforeEach(() => {
    pipe = new AssetAmountPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('formats', () => {
    expect(pipe.transform(algoAmount(123.456))).toBe('123.456');
    expect(pipe.transform(xrpAmount(123.456789))).toBe('123.456789');
  });

  it('skips null', () => {
    expect(pipe.transform(undefined)).toBe(undefined);
  });

  it('skips undefined', () => {
    expect(pipe.transform(undefined)).toBe(undefined);
  });
});
