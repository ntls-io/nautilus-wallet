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
