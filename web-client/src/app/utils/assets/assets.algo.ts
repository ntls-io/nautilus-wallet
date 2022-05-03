/**
 * Types and code for working with Algo on the Algorand ledger.
 *
 * 1. {@link AssetDisplay} constant: {@link ASSET_DISPLAY_ALGO}
 * 2. {@link LedgerInfo} constant: {@link LEDGER_INFO_ALGO}
 * 3. {@link AssetAmount} constructor: {@link assetAmountAlgo}
 */

import { AssetAmount, AssetDisplay, LedgerInfo } from './assets.common';

// AssetDisplay:

export type AssetSymbolAlgo = 'ALGO';

export const ASSET_SYMBOL_ALGO: AssetSymbolAlgo = 'ALGO';

export type AssetDisplayAlgo = AssetDisplay & {
  assetSymbol: AssetSymbolAlgo;
  maxDigits: 6;
};

export const ASSET_DISPLAY_ALGO: AssetDisplayAlgo = {
  assetSymbol: ASSET_SYMBOL_ALGO,
  minDigits: 0,
  maxDigits: 6,
};

// LedgerInfo:

export type LedgerTypeAlgorand = 'Algorand';

export const LEDGER_TYPE_ALGORAND: LedgerTypeAlgorand = 'Algorand';

export type LedgerInfoAlgo = LedgerInfo & {
  type: LedgerTypeAlgorand;
  isAlgo: true;
};

export const LEDGER_INFO_ALGO: LedgerInfoAlgo = {
  type: LEDGER_TYPE_ALGORAND,
  isAlgo: true,
};

// AssetAmount:

export type AssetAmountAlgo = AssetAmount & {
  assetDisplay: AssetDisplayAlgo;
  ledgerInfo: LedgerInfoAlgo;
};

export const assetAmountAlgo = (amount: number): AssetAmountAlgo => ({
  amount,
  assetDisplay: ASSET_DISPLAY_ALGO,
  ledgerInfo: LEDGER_INFO_ALGO,
});

// Type checks:

export const isLedgerInfoAlgo = (
  ledgerInfo: LedgerInfo | LedgerInfoAlgo
): ledgerInfo is LedgerInfoAlgo =>
  ledgerInfo.type === LEDGER_TYPE_ALGORAND &&
  'isAlgo' in ledgerInfo &&
  ledgerInfo.isAlgo;

export const isAssetAmountAlgo = (
  amount: AssetAmount | AssetAmountAlgo
): amount is AssetAmountAlgo =>
  amount.ledgerInfo.type === LEDGER_TYPE_ALGORAND &&
  amount.assetDisplay.assetSymbol === ASSET_SYMBOL_ALGO;
