import { UntypedFormControl } from '@angular/forms';
import { numericValidator, parseNumber } from 'src/app/utils/validators';

describe('Numeric validation', () => {
  // Examples that should be accepted.
  const acceptExamples: [string, number][] = [
    ['0', 0],
    ['0.0', 0],
    [' 0.0 ', 0], // Space padding
    ['-0', 0],
    ['1', 1],
    ['-1', -1],
    ['123.456', 123.456],
  ];

  // Examples that should be rejected.
  const rejectExamples: string[] = [
    '',
    '""',
    "''",
    '{}',
    '[]',
    'null',
    'undefined',
    ' ',
    '+',
    '-',
    '1.2.3',
    'Infinity',
    'NaN',
    '+1', // JSON doesn't take unary +
    '123x',
    'x123',
    '0123',
    '0x123',
    '1,000',
  ];

  describe('parseNumber', () => {
    describe('accepts', () => {
      for (const [example, expected] of acceptExamples) {
        it(`${JSON.stringify(example)} → ${JSON.stringify(expected)}`, () => {
          expect(parseNumber(example)).toBe(expected);
        });
      }
    });

    describe('rejects', () => {
      for (const example of rejectExamples) {
        it(`${JSON.stringify(example)}`, () => {
          expect(parseNumber(example)).toBeUndefined();
        });
      }
    });
  });

  describe('numericValidator', () => {
    const formControlWithValue = (value: string): UntypedFormControl =>
      new UntypedFormControl(value);

    describe('accepts', () => {
      for (const [example] of acceptExamples) {
        it(`${JSON.stringify(example)}`, () => {
          expect(numericValidator(formControlWithValue(example))).toBeNull();
        });
      }
    });

    describe('rejects', () => {
      for (const example of rejectExamples) {
        it(`${JSON.stringify(example)}`, () => {
          expect(numericValidator(formControlWithValue(example))).toEqual({
            numeric: true,
          });
        });
      }
    });
  });
});
