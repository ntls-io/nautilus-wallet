import { AbstractControl, ValidatorFn } from '@angular/forms';
import algosdk from 'algosdk';
import * as xrpl from 'xrpl';

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

type AddressType = 'Algorand' | 'XRPL';

const addressTypes = (address: string): AddressType[] => {
  const coerce = (t: AddressType[]) => t;
  return [
    ...coerce(algosdk.isValidAddress(address) ? ['Algorand'] : []),
    ...coerce(xrpl.isValidAddress(address) ? ['XRPL'] : []),
  ];
};

export const addressType = (address: string): AddressType | undefined => {
  const types = addressTypes(address);
  switch (types.length) {
    case 0:
      return undefined;
    case 1:
      return types[0];
    default:
      throw Error(
        `addressType: ${JSON.stringify(
          types
        )} has multiple types: ${JSON.stringify(types)}`
      );
  }
};
