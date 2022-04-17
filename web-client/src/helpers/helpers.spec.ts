import { checkClass, Constructor, ifDefined, never } from 'src/helpers/helpers';
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

  it('allows changing type', () => {
    const value = 5;
    expect(ifDefined(value, (n) => [n])).toEqual([value]);
  });
});

describe('checkClass', () => {
  class Mock {
    public constructor() {}
  }

  it('', () => {
    const cases: Array<[unknown, Constructor<unknown>]> = [
      [new Map(), Map],
      [new Mock(), Mock],
    ];
    cases.forEach(([o, cls]) => {
      expect(checkClass(o, cls)).toBe(o);
    });
  });

  it('throws error', () => {
    const cases: Array<[unknown, Constructor<unknown>, string]> = [
      [new Mock(), Map, 'expected Map, got Mock: [object Object]'],
      [new Map(), Mock, 'expected Mock, got Map: [object Map]'],
    ];
    cases.forEach(([o, cls, message]) => {
      expect(() => checkClass(o, cls)).toThrowError(message);
    });
  });
});
