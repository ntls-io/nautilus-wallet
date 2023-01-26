import { assetAmountXrp } from 'src/app/utils/assets/assets.xrp';
import { AssetSymbolPipe } from './asset-symbol.pipe';

describe('AssetSymbolPipe', () => {
  let pipe: AssetSymbolPipe;

  beforeEach(() => {
    pipe = new AssetSymbolPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('formats', () => {
    expect(pipe.transform(assetAmountXrp(0))).toBe('XRP');
  });

  it('skips null', () => {
    expect(pipe.transform(undefined)).toBe(undefined);
  });

  it('skips undefined', () => {
    expect(pipe.transform(undefined)).toBe(undefined);
  });
});
