/**
 * Types and code for working with tokens on the XRP ledger.
 *
 * 1. {@link AssetDisplay}: use common base type.
 * 2. {@link LedgerInfo} constructor: {@link ledgerInfoXrplToken}
 * 3. {@link AssetAmount} constructor: {@link assetAmountXrplToken}
 */

import { defined } from 'src/app/utils/errors/panic';
import { parseNumber } from 'src/app/utils/validators';
import { IssuedCurrencyAmount } from 'xrpl/dist/npm/models/common/index';
import { AssetAmount, LedgerInfo } from './assets.common';
import { LedgerTypeXrpl, LEDGER_TYPE_XRPL } from './assets.xrp';

// LedgerInfo:

export type LedgerInfoXrplToken = LedgerInfo & {
  type: LedgerTypeXrpl;
  isToken: true;
  currency: string;
  issuer: string;
};

export const ledgerInfoXrplToken = (
  currency: string,
  issuer: string
): LedgerInfoXrplToken => ({
  type: LEDGER_TYPE_XRPL,
  isToken: true,
  currency,
  issuer,
});

// AssetAmount:

export type AssetAmountXrplToken = AssetAmount & {
  ledgerInfo: LedgerInfoXrplToken;
};

export const assetAmountXrplToken = (
  amount: number,
  { currency, issuer }: { currency: string; issuer: string }
): AssetAmountXrplToken => ({
  amount,
  assetDisplay: { assetSymbol: currency, minDigits: 0, maxDigits: 3 },
  ledgerInfo: ledgerInfoXrplToken(currency, issuer),
});

// Type checks:

export const isLedgerInfoXrplToken = (
  ledgerInfo: LedgerInfo | LedgerInfoXrplToken
): ledgerInfo is LedgerInfoXrplToken =>
  ledgerInfo.type === LEDGER_TYPE_XRPL &&
  'isToken' in ledgerInfo &&
  ledgerInfo.isToken &&
  'currency' in ledgerInfo;

export const isAssetAmountXrplToken = (
  amount: AssetAmount
): amount is AssetAmountXrplToken => isLedgerInfoXrplToken(amount.ledgerInfo);

// Ledger representation conversion:

export const convertFromLedgerToAssetAmountXrplToken = (
  ledgerAmount: IssuedCurrencyAmount
): AssetAmountXrplToken => {
  const { currency, issuer, value } = ledgerAmount;
  const amount = defined(parseNumber(value), `bad number: ${value}`);
  return assetAmountXrplToken(amount, { currency, issuer });
};

export const convertFromAssetAmountXrplTokenToLedger = (
  assetAmount: AssetAmountXrplToken
): IssuedCurrencyAmount => {
  const {
    amount,
    ledgerInfo: { currency, issuer },
  } = assetAmount;
  return { currency, issuer, value: amount.toString() };
};
