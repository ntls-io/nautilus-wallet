import { SuggestedParams, Transaction, TransactionType } from 'algosdk';
import { AssetTransferTransaction } from 'algosdk/dist/types/src/types/transactions/asset';
import {
  AssetTransferRequiredParameters,
  makeAssetTransferTxnHelper,
  makePaymentTxnHelper,
  OptionalParameters,
} from './algorand.helpers';

describe('makePaymentTxnHelper', () => {
  const suggested: SuggestedParams = {
    fee: 1_000,
    firstRound: 10_000,
    lastRound: 11_000,
    genesisID: 'dummy genesis ID',
    genesisHash: 'dummy genesis hash',
  };
  const dummyAddress =
    'VCMJKWOY5P5P7SKMZFFOCEROPJCZOTIJMNIYNUCKH7LRO45JMJP6UYBIJA';
  const required = {
    from: dummyAddress,
    to: dummyAddress,
    amount: 123,
  };

  it('with required only', () => {
    expect(makePaymentTxnHelper(suggested, required)).toEqual(
      new Transaction({ ...suggested, ...required })
    );
  });

  it('with no-effect optional', () => {
    for (const optional of [
      undefined,
      {},
      { options: {} },
      { modifySuggested: (params) => params },
      { options: {}, modifySuggested: (params) => params },
    ] as Array<OptionalParameters>) {
      expect(makePaymentTxnHelper(suggested, required, optional)).toEqual(
        new Transaction({ ...suggested, ...required })
      );
    }
  });

  it('with options', () => {
    const note = new TextEncoder().encode('test note');
    expect(
      makePaymentTxnHelper(suggested, required, { options: { note } })
    ).toEqual(
      new Transaction({
        ...suggested,
        ...required,
        note,
      })
    );
  });

  it('with modifySuggested', () => {
    expect(
      makePaymentTxnHelper(suggested, required, {
        modifySuggested: (params) => ({
          ...params,
          lastRound: params.firstRound + 4,
        }),
      })
    ).toEqual(
      new Transaction({
        ...suggested,
        ...required,
        lastRound: suggested.firstRound + 4,
      })
    );
  });
});

describe('makeAssetTransferTxnHelper', () => {
  const suggested: SuggestedParams = {
    fee: 1_000,
    firstRound: 10_000,
    lastRound: 11_000,
    genesisID: 'dummy genesis ID',
    genesisHash: 'dummy genesis hash',
  };
  const dummyAddress =
    'VCMJKWOY5P5P7SKMZFFOCEROPJCZOTIJMNIYNUCKH7LRO45JMJP6UYBIJA';

  const required: AssetTransferRequiredParameters = {
    from: dummyAddress,
    to: dummyAddress,
    amount: 123,
    assetIndex: 456,
  };

  /**
   * For this helper, we expect the "axfer" transaction type.
   */
  const newAxferTransaction = (
    transaction: AssetTransferTransaction
  ): Transaction =>
    new Transaction({ type: TransactionType.axfer, ...transaction });

  it('with required only', () => {
    expect(makeAssetTransferTxnHelper(suggested, required)).toEqual(
      newAxferTransaction({ ...suggested, ...required })
    );
  });

  it('with no-effect optional', () => {
    for (const optional of [
      undefined,
      {},
      { options: {} },
      { modifySuggested: (params) => params },
      { options: {}, modifySuggested: (params) => params },
    ] as Array<OptionalParameters>) {
      expect(makeAssetTransferTxnHelper(suggested, required, optional)).toEqual(
        newAxferTransaction({ ...suggested, ...required })
      );
    }
  });

  it('with options', () => {
    const note = new TextEncoder().encode('test note');
    expect(
      makeAssetTransferTxnHelper(suggested, required, { options: { note } })
    ).toEqual(
      newAxferTransaction({
        ...suggested,
        ...required,
        note,
      })
    );
  });

  it('with modifySuggested', () => {
    expect(
      makeAssetTransferTxnHelper(suggested, required, {
        modifySuggested: (params) => ({
          ...params,
          lastRound: params.firstRound + 4,
        }),
      })
    ).toEqual(
      newAxferTransaction({
        ...suggested,
        ...required,
        lastRound: suggested.firstRound + 4,
      })
    );
  });
});
