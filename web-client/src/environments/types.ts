import {
  AlgodTokenHeader,
  CustomTokenHeader,
} from 'algosdk/dist/types/src/client/urlTokenBaseHTTPClient';
import { AssetConfigs } from 'src/app/utils/assets/assets.config';
import * as xrpl from 'xrpl';

/**
 * Common type declaration for environment files.
 */
export type Environment = {
  firebase: {
    projectId: string;
    appId: string;
    databaseURL: string;
    storageBucket: string;
    apiKey: string;
    authDomain: string;
    messagingSenderId: string;
    measurementId: string;
  };
  /**
   * Toggle Angular and libraries between production and development modes.
   */
  production: boolean;
  staging?: boolean;

  /**
   * Name of the organization.
   */
  organization: string;

  /**
   * Whether to persist Akita state.
   *
   * @see https://datorama.github.io/akita/docs/enhancers/persist-state
   */
  persistAkitaState?: boolean;

  /**
   * Base URL for the Nautilus Wallet Enclave.
   * (Must end in "/"!)
   */
  nautilusWalletServer: string;

  /**
   * Base URL for the Nautilus Wallet Asset Services.
   * (Must end in "/"!)
   */
  nautilusAssetServices: string;

  /**
   * Per-asset configuration.
   */
  assetConfigs?: AssetConfigs;

  /**
   * Algorand Algod client connection details.
   */
  algod?: Algodv2Params;

  /**
   * (Optional) A base URL to use to link transaction IDs.
   *
   * This should generally point at an explorer for the configured Algorand network.
   *
   * @see import('src/app/views/pay/pay.page').PayPage.notifySuccess
   */
  algorandTransactionUrlPrefix?: string;

  /**
   * (Optional) An Algorand ASA to try to opt in to by default.
   *
   * @see import('src/app/views/wallet/wallet.page').WalletPage.checkAlgorandAssetOptIn
   */
  defaultAlgorandAssetId?: number;

  /**
   * XRPL.js client configuration.
   *
   * @see https://js.xrpl.org/classes/Client.html#constructor
   */
  xrplClient?: {
    server: string;

    /** @see https://js.xrpl.org/interfaces/ClientOptions.html */
    options?: xrpl.ClientOptions;
  };

  commissionPercentage: number;

  tokenIssuer: string;

  tokenSymbol: string;

  xrpIssuer: string;

  hideXrpBalance: boolean;

  autofundXrp: boolean;

  hidePullPayment: boolean;

  enableQuickAccess: boolean;

  autoLogout: boolean;

  autofundXrpAmount: number;

  autofundAccountPin: string;

  autofundXrpPublicKey: string;

  /**
   * Require a clear Onfido check status before enabling sending payments.
   */
  requireOnfidoCheckBeforeSendPayment?: boolean;
};

/**
 * Algodv2 constructor parameters.
 *
 * @see https://algorand.github.io/js-algorand-sdk/classes/Algodv2.html#constructor
 */
type Algodv2Params = {
  token: string | AlgodTokenHeader | CustomTokenHeader;
  baseServer?: string;
  port?: string | number;
};
