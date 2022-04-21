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
export const ifDefined = <T>(
  value: T | null | undefined,
  f: (v: T) => T
): T | undefined =>
  value === null || value === undefined ? undefined : f(value);

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
