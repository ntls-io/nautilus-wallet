/** Core request / response message types. */

import {
  AlgorandTransactionSigned,
  WalletDisplay,
  XrpTransactionSigned,
} from './entities';
import { Bytes, WalletId, WalletPin } from './types';

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
  | { InvalidAuth: null }
  | { Failed: string };

export type SignTransaction = {
  wallet_id: WalletId;
  auth_pin: WalletPin;

  // TODO(Pi): Separate these out better.
  algorand_transaction_bytes?: Bytes;
  xrp_transaction_bytes?: Bytes;
};

export type SignTransactionResult =
  | { Signed: AlgorandTransactionSigned }
  | { SignedXrp: XrpTransactionSigned }
  | { InvalidAuth: null }
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
