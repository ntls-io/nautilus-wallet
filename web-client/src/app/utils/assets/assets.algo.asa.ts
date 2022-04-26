/**
 * Types and code for working with ASAs on the Algorand ledger.
 *
 * 1. {@link AssetDisplay}: use common base type.
 * 2. {@link LedgerInfo} constructor: {@link ledgerInfoAsa}
 * 3. {@link AssetAmount} constructor: {@link assetAmountAsa}
 */

import { LedgerTypeAlgorand, LEDGER_TYPE_ALGORAND } from './assets.algo';
import { AssetAmount, LedgerInfo } from './assets.common';

// LedgerInfo:

export type LedgerInfoAsa = LedgerInfo & {
  type: LedgerTypeAlgorand;
  isAsa: true;
  assetId: number;
  decimals: number;
};

export const ledgerInfoAsa = (
  assetId: number,
  decimals: number
): LedgerInfoAsa => ({
  type: LEDGER_TYPE_ALGORAND,
  isAsa: true,
  assetId,
  decimals,
});

// AssetAmount:

export type AssetAmountAsa = AssetAmount & {
  ledgerInfo: LedgerInfoAsa;
};

export const assetAmountAsa = (
  amount: number,
  {
    assetSymbol,
    assetId,
    decimals,
  }: { assetSymbol: string; assetId: number; decimals: number }
): AssetAmountAsa => ({
  amount,
  assetDisplay: { assetSymbol, minDigits: 0, maxDigits: decimals },
  ledgerInfo: ledgerInfoAsa(assetId, decimals),
});

// Type checks:

export const isLedgerInfoAsa = (
  ledgerInfo: LedgerInfo | LedgerInfoAsa
): ledgerInfo is LedgerInfoAsa =>
  ledgerInfo.type === LEDGER_TYPE_ALGORAND &&
  'isAsa' in ledgerInfo &&
  ledgerInfo.isAsa &&
  'assetId' in ledgerInfo &&
  'decimals' in ledgerInfo;

export const isAssetAmountAsa = (
  amount: AssetAmount
): amount is AssetAmountAsa => isLedgerInfoAsa(amount.ledgerInfo);

// Ledger representation conversion:

/**
 * The ledger representation of an ASA amount and metadata.
 */
export type LedgerAmountAsa = {
  /** Amount in integer base units, as stored on the ledger. */
  amount: number;

  assetId: number;
  unitName: string;
  decimals: number;
};

export const convertFromLedgerToAssetAmountAsa = (
  ledgerAmount: LedgerAmountAsa
): AssetAmountAsa => {
  const { amount, assetId, unitName, decimals } = ledgerAmount;
  return assetAmountAsa(amount / 10 ** decimals, {
    assetSymbol: unitName,
    assetId,
    decimals,
  });
};

export const convertFromAssetAmountAsaToLedger = (
  assetAmount: AssetAmountAsa
): LedgerAmountAsa => {
  const {
    amount,
    assetDisplay: { assetSymbol },
    ledgerInfo: { assetId, decimals },
  } = assetAmount;
  return {
    amount: amount * 10 ** decimals,
    assetId,
    unitName: assetSymbol,
    decimals,
  };
};
