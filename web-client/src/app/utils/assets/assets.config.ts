import {
  ASSET_SYMBOL_ALGO,
  isLedgerInfoAlgo,
  LEDGER_TYPE_ALGORAND,
} from './assets.algo';
import { isLedgerInfoAsa, LedgerInfoAsa } from './assets.algo.asa';
import { LedgerInfo } from './assets.common';
import {
  ASSET_SYMBOL_XRP,
  isLedgerInfoXrp,
  LEDGER_TYPE_XRPL,
} from './assets.xrp';
import { isLedgerInfoXrplToken, LedgerInfoXrplToken } from './assets.xrp.token';

/**
 * A collection of {@link AssetConfig}, per ledger / asset.
 *
 * @see Environment.assetConfigs
 */
export type AssetConfigs = {
  [LEDGER_TYPE_ALGORAND]?: {
    [ASSET_SYMBOL_ALGO]?: AssetConfig;

    ASA?: {
      [assetId: LedgerInfoAsa['assetId']]: AssetConfig;
    };
  };

  [LEDGER_TYPE_XRPL]?: {
    [ASSET_SYMBOL_XRP]?: AssetConfig;

    XrplToken?: {
      [currency: LedgerInfoXrplToken['currency']]: AssetConfig;
    };
  };
};

/**
 * Configuration for a particular asset.
 */
export type AssetConfig = {
  transactionLimit?: number;
};

/**
 * Look up the asset config for the given asset's ledger info, if any.
 */
export const getAssetConfigForLedgerInfo = (
  assetConfigs: AssetConfigs,
  ledgerInfo: LedgerInfo
): AssetConfig | undefined => {
  if (ledgerInfo.type === LEDGER_TYPE_ALGORAND) {
    if (isLedgerInfoAlgo(ledgerInfo)) {
      return assetConfigs?.[LEDGER_TYPE_ALGORAND]?.[ASSET_SYMBOL_ALGO];
    } else if (isLedgerInfoAsa(ledgerInfo)) {
      return assetConfigs?.[LEDGER_TYPE_ALGORAND]?.ASA?.[ledgerInfo.assetId];
    }
  } else if (ledgerInfo.type === LEDGER_TYPE_XRPL) {
    if (isLedgerInfoXrp(ledgerInfo)) {
      return assetConfigs?.[LEDGER_TYPE_XRPL]?.[ASSET_SYMBOL_XRP];
    }
    if (isLedgerInfoXrplToken(ledgerInfo)) {
      return assetConfigs?.[LEDGER_TYPE_XRPL]?.XrplToken?.[ledgerInfo.currency];
    }
  }
};
