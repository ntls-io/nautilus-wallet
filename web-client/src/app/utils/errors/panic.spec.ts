import { assertConsoleLogs } from 'src/tests/test.helpers';
import { defined, panic } from './panic';

describe('panic', () => {
  it('returns value', () => {
    const message = 'some error message';
    const value = 5;
    assertConsoleLogs({ error: [[message, value]] }, async () => {
      expect(() => panic(message, value)).toThrowError(message);
    });
  });
});

describe('defined', () => {
  const values = [5, 'spam', null, {}, [], 0, ''];
  for (const value of values) {
    it(`returns defined ${value}`, () => {
      expect(defined(value)).toBe(value);
      expect(defined(value, 'some message')).toBe(value);
    });
  }

  it('panics for undefined', () => {
    assertConsoleLogs(
      { error: [['unexpected undefined', undefined]] },
      async () => {
        expect(() => defined(undefined)).toThrowError('unexpected undefined');
      }
    );
  });

  it('panics with message', () => {
    const expectedMessage = 'something went wrong';
    assertConsoleLogs({ error: [[expectedMessage, undefined]] }, async () => {
      expect(() => defined(undefined, expectedMessage)).toThrowError(
        expectedMessage
      );
    });
  });
});
