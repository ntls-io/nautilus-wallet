/**
 * Common representation types and code for working with asset amounts.
 */

import { formatNumber } from '@angular/common';
import { environment } from 'src/environments/environment';

/**
 * Application-wide description of how to display a particular asset.
 *
 * Assets may be well-known and predefined, or dynamic.
 */
export type AssetDisplay = {
  assetSymbol: string;
  minDigits: number;
  maxDigits: number;
};

/**
 * Application-wide description of an asset's ledger.
 *
 * This describes where a particular asset resides or is defined on.
 * Subtypes may  add additional information here, such as asset IDs or conversion factors.
 */
export type LedgerInfo = {
  type: string;
};

/**
 * An amount denominated in a particular asset on a particular ledger.
 */
export type AssetAmount = {
  amount: number;
  assetDisplay: AssetDisplay;
  ledgerInfo: LedgerInfo;
};

/** Format the asset symbol of an amount. */
export const formatAssetSymbol = (assetAmount: AssetAmount) =>
  assetAmount.assetDisplay.assetSymbol;

/** Default locale, matching Angular's {@link formatNumber}. */
const LOCALE = 'en-US';

/** Format an asset amount with the right number of fractional digits. .*/
export const formatAssetAmount = ({
  amount,
  assetDisplay: { maxDigits, minDigits },
}: AssetAmount) => formatNumber(amount, LOCALE, `1.${minDigits}-${maxDigits}`);

/** Construct a new asset amount with the same metadata as a base value. */
export const assetAmountFromBase = (
  amount: number,
  { assetDisplay, ledgerInfo }: AssetAmount
): AssetAmount => ({
  amount,
  assetDisplay,
  ledgerInfo,
});

/**  Calculates the commission for a given asset amount, returning an instance of the same asset/token type */
export const getAssetCommission = (
  assetAmount: AssetAmount,
  isConnector?: boolean
): AssetAmount => {
  const commissionPercentage = isConnector
    ? environment.commissionPercentage
    : 0;

  return {
    ...assetAmount,
    // Assume 1% comission amount
    amount: assetAmount ? assetAmount.amount * commissionPercentage : 0,
  };
};
