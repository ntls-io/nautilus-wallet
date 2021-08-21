import algosdk, { SuggestedParams, Transaction } from 'algosdk';
import { PaymentTxn } from 'algosdk/dist/types/src/types/transactions';
import { RenameProperty } from 'algosdk/dist/types/src/types/utils';

export type RequiredParameters = Pick<PaymentTxn, 'from' | 'to' | 'amount'>;

export type OptionalParameters = {
  options?: OptionParameters;
  modifySuggested?: (suggested: SuggestedParams) => SuggestedParams;
};

export type OptionParameters = RenameProperty<
  Pick<PaymentTxn, 'closeRemainderTo' | 'note' | 'reKeyTo'>,
  'reKeyTo',
  'rekeyTo'
>;

/** Wrap `makePaymentTxnWithSuggestedParamsFromObject` with more convenient argument handling. */
export const makePaymentTxnHelper = (
  suggested: SuggestedParams,
  required: RequiredParameters,
  optional?: OptionalParameters
): Transaction => {
  const unmodified = <O>(o: O): O => o;
  const suggestedParams = (optional?.modifySuggested ?? unmodified)(suggested);
  return algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    suggestedParams,
    ...optional?.options,
    ...required,
  });
};
