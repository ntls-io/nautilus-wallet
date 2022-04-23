/**
 * Types and code for working with Algo on the Algorand ledger.
 *
 * 1. {@link AssetDisplay} constant: {@link ASSET_DISPLAY_ALGO}
 * 2. {@link LedgerInfo} constant: {@link LEDGER_INFO_ALGORAND}
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
};

export const LEDGER_INFO_ALGORAND: LedgerInfoAlgo = {
  type: LEDGER_TYPE_ALGORAND,
};

// AssetAmount:

export type AssetAmountAlgo = AssetAmount & {
  assetDisplay: AssetDisplayAlgo;
  ledgerInfo: LedgerInfoAlgo;
};

export const assetAmountAlgo = (amount: number): AssetAmountAlgo => ({
  amount,
  assetDisplay: ASSET_DISPLAY_ALGO,
  ledgerInfo: LEDGER_INFO_ALGORAND,
});

// Type checks:

export const isAssetAmountAlgo = (
  amount: AssetAmount | AssetAmountAlgo
): amount is AssetAmountAlgo =>
  amount.ledgerInfo.type === LEDGER_TYPE_ALGORAND &&
  amount.assetDisplay.assetSymbol === ASSET_SYMBOL_ALGO;
