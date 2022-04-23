import { assetAmountAlgo } from 'src/app/utils/assets/assets.algo';
import { assetAmountXrp } from 'src/app/utils/assets/assets.xrp';
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
    expect(pipe.transform(assetAmountAlgo(123.456))).toBe('123.456');
    expect(pipe.transform(assetAmountXrp(123.456789))).toBe('123.456789');
  });

  it('skips null', () => {
    expect(pipe.transform(undefined)).toBe(undefined);
  });

  it('skips undefined', () => {
    expect(pipe.transform(undefined)).toBe(undefined);
  });
});
