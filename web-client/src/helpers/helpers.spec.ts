import { ifDefined, never } from 'src/helpers/helpers';
import { assertConsoleLogs } from 'src/tests/test.helpers';

describe('never', () => {
  it('logs and throws error', () => {
    const value = 'foo' as never;
    assertConsoleLogs(
      { error: [['expected never, got:', value]] },
      async () => {
        expect(() => never(value)).toThrowError(
          'expected never, got value (see error log)'
        );
      }
    );
  });
});

describe('ifDefined', () => {
  it('ignores undefined', () => {
    const value = undefined as number | undefined;
    expect(ifDefined(value, (n) => n * 2)).toBeUndefined();
  });

  it('ignores null', () => {
    const value = null as number | null;
    expect(ifDefined(value, (n) => n * 2)).toBeUndefined();
  });

  it('applies to defined', () => {
    const value = 5;
    expect(ifDefined(value, (n) => n * 2)).toBe(10);
  });
});
