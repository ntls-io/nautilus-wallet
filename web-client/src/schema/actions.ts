/** Core request / response message types. */

import { WalletDisplay } from './entities';
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

  transaction_to_sign: TransactionToSign;
};

/** For {@link SignTransaction}: A choice of type of transaction to sign. */
export type TransactionToSign = {
  /** An unsigned Algorand transaction. */
  AlgorandTransaction: { transaction_bytes: Bytes };
};

export type SignTransactionResult =
  | { Signed: TransactionSigned }
  | { InvalidAuth: null }
  | { Failed: string };

/** For {@link SignTransactionResult}: The possible types of signed transactions. */
export type TransactionSigned = {
  /** A signed Algorand transaction. */
  AlgorandTransactionSigned: { signed_transaction_bytes: Bytes };
};

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
