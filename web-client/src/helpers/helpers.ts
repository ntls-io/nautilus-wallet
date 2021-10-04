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
