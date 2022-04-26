import { AbstractControl, ValidatorFn } from '@angular/forms';

/**
 * Safely parse untrusted user input to a `number`.
 *
 * This uses JSON-compatible definition "number".
 */
export const parseNumber = (text?: string): number | undefined => {
  const result = text !== undefined ? tryJsonParse(text) : undefined;
  return typeof result === 'number' ? result : undefined;
};

const tryJsonParse = (text: string): any => {
  try {
    return JSON.parse(text);
  } catch (err) {
    if (err instanceof SyntaxError) {
      return undefined;
    } else {
      throw err;
    }
  }
};

/**
 * Validate values that can be parsed with {@link parseNumber}.
 *
 * (Note: This is named "numeric" rather than "number" because the latter is a blacklisted identifier.)
 */
export const numericValidator: ValidatorFn = (
  control: AbstractControl
): NumericValidationError | null => {
  if (typeof control.value === 'string') {
    return parseNumber(control.value) === undefined ? { numeric: true } : null;
  } else {
    throw new TypeError(
      `numberValidator: expected string value, got ${typeof control.value}`
    );
  }
};

/** @see numericValidator*/
export type NumericValidationError = {
  numeric: true;
};
