import {
  AlgodTokenHeader,
  CustomTokenHeader,
} from 'algosdk/dist/types/src/client/client';

/**
 * Common type declaration for environment files.
 */
export type Environment = {
  /**
   * Toggle Angular and libraries between production and development modes.
   */
  production: boolean;

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
   * Algorand Algod client connection details.
   */
  algod?: Algodv2Params;
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
