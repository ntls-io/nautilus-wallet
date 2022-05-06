/**
 * General helper code.
 */

/**
 * Helper for exhaustiveness checking: mark unreachable values.
 */
export const never = (value: never): never => {
  console.error('expected never, got:', value);
  throw new TypeError('expected never, got value (see error log)');
};

/**
 * Apply `f` to an optional `value`.
 *
 * This works like nullish coalescing and optional chaining, but for a function argument.
 */
export const ifDefined = <T, R>(
  value: T | null | undefined,
  f: (v: T) => R
): R | undefined =>
  value === null || value === undefined ? undefined : f(value);

/**
 * Verify that all items in a list are defined, or return `undefined`.
 */
export const allDefinedOrNone = <T>(
  values: (T | undefined)[]
): T[] | undefined =>
  values.every((v) => v !== undefined) ? (values as T[]) : undefined;

/**
 * Return `n` if non-zero, otherwise `undefined`.
 */
export const ignoreZero = (n?: number): number | undefined =>
  n === 0 ? undefined : n;

export type Constructor<T> = new (...args: any[]) => T;

/**
 * Helper: Check that o is an instance of the given class.
 */
export const checkClass = <T>(o: unknown, cls: Constructor<T>): T => {
  if (o instanceof cls) {
    return o;
  } else {
    const oClsName = (o as any)?.constructor?.name;
    throw new TypeError(`expected ${cls.name}, got ${oClsName}: ${o}`);
  }
};
