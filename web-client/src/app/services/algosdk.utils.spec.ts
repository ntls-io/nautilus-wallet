import {
  convertToAlgos,
  convertToMicroAlgos,
} from 'src/app/services/algosdk.utils';

describe('convertToAlgos', () => {
  it('converts', () => {
    expect(convertToAlgos(1)).toBe(0.00_000_1);
  });
  it('rejects negative', () => {
    expect(() => convertToAlgos(-1)).toThrowError(
      'Microalgos should be positive and less than 2^53 - 1.'
    );
  });
});

describe('convertToMicroAlgos', () => {
  it('converts', () => {
    expect(convertToMicroAlgos(1)).toBe(1_000_000);
  });
  it('converts negative', () => {
    expect(convertToMicroAlgos(-1)).toBe(-1_000_000);
  });
});
