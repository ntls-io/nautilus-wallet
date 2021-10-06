/**
 * Helper for unrecoverable errors: Log an error message and inspectable value, and abort.
 *
 * @throws Error with `message`
 */
export const panic = (message: string, value: unknown): never => {
  console.error(message, value);
  throw new Error(message);
};
