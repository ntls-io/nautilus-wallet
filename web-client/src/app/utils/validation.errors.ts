/**
 * Type declarations for Angular's builtin form validation errors.
 */

/**
 * @see import('@angular/forms').Validators
 * @see import('@angular/forms').ValidationErrors
 */
export type AngularValidationErrors = Partial<
  MinValidationError &
    MaxValidationError &
    RequiredValidationError &
    EmailValidationError &
    PatternValidationError &
    MinLengthValidationError &
    MaxLengthValidationError
>;

/** @see import('@angular/forms').Validators.min */
export type MinValidationError = {
  min: {
    min: number;
    actual: number;
  };
};

/** @see import('@angular/forms').Validators.max */
export type MaxValidationError = {
  max: {
    max: number;
    actual: number;
  };
};

/** @see import('@angular/forms').Validators.required */
export type RequiredValidationError = {
  required: true;
};

/** @see import('@angular/forms').Validators.email */
export type EmailValidationError = {
  email: true;
};

/** @see import('@angular/forms').Validators.minLength */
export type MinLengthValidationError = {
  minlength: {
    requiredLength: number;
    actualLength: number;
  };
};

/** @see import('@angular/forms').Validators.maxLength */
export type MaxLengthValidationError = {
  maxlength: {
    requiredLength: number;
    actualLength: number;
  };
};

/** @see import('@angular/forms').Validators.pattern */
export type PatternValidationError = {
  pattern: {
    requiredPattern: string;
    actualValue: string;
  };
};
