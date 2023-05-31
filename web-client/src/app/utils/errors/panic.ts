/**
 * Helper for unrecoverable errors: Log an error message and inspectable value, and abort.
 *
 * @throws Error with `message`
 */
export const panic = (message: string, value: unknown): never => {
  console.error(message, value);
  throw new Error(message);
};

/**
 * Return defined value or panic.
 */
export const defined = <T>(value: T | undefined, message?: string): T => {
  if (value !== undefined) {
    return value;
  } else {
    throw panic(message ?? 'unexpected undefined', value);
  }
};
