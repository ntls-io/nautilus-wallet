/**
 * Helpers for representing and displaying asset amounts.
 */
import { formatNumber } from '@angular/common';

/**
 * An application-wide description of a particular asset.
 *
 * This type is primarily concerned with display concerns.
 * Assets may be well-known and predefined, or dynamic.
 */
export type AssetInfo = {
  assetSymbol: string;
  minDigits: number;
  maxDigits: number;
};

/** An amount denominated in a particular asset. */
export type AssetAmount = {
  amount: number;
  assetInfo: AssetInfo;
};

/** Format the asset symbol of an amount. */
export const formatAssetSymbol = (assetAmount: AssetAmount) =>
  assetAmount.assetInfo.assetSymbol;

/** Default locale, matching Angular's {@link formatNumber}. */
const LOCALE = 'en-US';

/** Format an asset amount with the right number of fractional digits. .*/
export const formatAssetAmount = ({
  amount,
  assetInfo: { maxDigits, minDigits },
}: AssetAmount) => formatNumber(amount, LOCALE, `1.${minDigits}-${maxDigits}`);

export const algoInfo: AssetInfo = {
  assetSymbol: 'ALGO',
  minDigits: 0,
  maxDigits: 6,
};

export const xrpInfo: AssetInfo = {
  assetSymbol: 'XRP',
  minDigits: 0,
  maxDigits: 6,
};

export const algoAmount = (amount: number): AssetAmount => ({
  amount,
  assetInfo: algoInfo,
});

export const xrpAmount = (amount: number): AssetAmount => ({
  amount,
  assetInfo: xrpInfo,
});
