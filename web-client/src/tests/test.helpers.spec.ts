import { checkClass, Constructor } from './test.helpers';

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
