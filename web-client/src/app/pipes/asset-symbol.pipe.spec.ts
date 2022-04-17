import { algoAmount, xrpAmount } from 'src/app/utils/asset.display';
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
    expect(pipe.transform(algoAmount(0))).toBe('ALGO');
    expect(pipe.transform(xrpAmount(0))).toBe('XRP');
  });

  it('skips null', () => {
    expect(pipe.transform(undefined)).toBe(undefined);
  });

  it('skips undefined', () => {
    expect(pipe.transform(undefined)).toBe(undefined);
  });
});
