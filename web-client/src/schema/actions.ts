/** Core request / response message types. */

import { AlgorandTransactionSigned, WalletDisplay } from './entities';
import { Bytes, WalletId, WalletPin } from './types';

/* eslint-disable @typescript-eslint/naming-convention */

export type CreateWallet = {
  owner_name: string;
  auth_pin: WalletPin;
};

export type CreateWalletResult =
  | { Created: WalletDisplay }
  | { Failed: string };

export type OpenWallet = {
  wallet_id: WalletId;
  auth_pin: WalletPin;
};

export type OpenWalletResult =
  | { Opened: WalletDisplay }
  | { InvalidAuth: void }
  | { Failed: string };

export type SignTransaction = {
  wallet_id: WalletId;
  auth_pin: WalletPin;
  algorand_transaction_bytes: Bytes;
};

export type SignTransactionResult =
  | { Signed: AlgorandTransactionSigned }
  | { InvalidAuth: void }
  | { Failed: string };

/** Dispatching enum for action requests. */
export type WalletRequest =
  | { CreateWallet: CreateWallet }
  | { OpenWallet: OpenWallet }
  | { SignTransaction: SignTransaction };

/** Dispatching enum for action results. */
export type WalletResponse =
  | { CreateWallet: CreateWalletResult }
  | { OpenWallet: OpenWalletResult }
  | { SignTransaction: SignTransactionResult };
