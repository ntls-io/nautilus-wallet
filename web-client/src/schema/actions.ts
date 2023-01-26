/** Core request / response message types. */

import { WalletDisplay, XrplAccountDisplay } from './entities';
import { Bytes, WalletId, WalletPin } from './types';

export type CreateWallet = {
  owner_name: string;
  auth_pin: WalletPin;
  auth_map: object;
  phone_number?: string;
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

export type GetXrplWallet = {
  wallet_id: WalletId;
};

export type GetXrplWalletResult =
  | { Opened: XrplAccountDisplay }
  | { Failed: string };

export type SignTransaction = {
  wallet_id: WalletId;
  auth_pin: WalletPin;

  transaction_to_sign: TransactionToSign;
};

/** For {@link SignTransaction}: A choice of type of transaction to sign. */
export type TransactionToSign =
  /** An unsigned XRPL transaction. */
  { XrplTransaction: { transaction_bytes: Bytes } };

export type SignTransactionResult =
  | { Signed: TransactionSigned }
  | { InvalidAuth: null }
  | { Failed: string };

/** For {@link SignTransactionResult}: The possible types of signed transactions. */
export type TransactionSigned =
  /** A signed Xrpl transaction.*/
  {
    XrplTransactionSigned: {
      signed_transaction_bytes: Bytes;
      signature_bytes: Bytes;
    };
  };

export type SaveOnfidoCheck = {
  wallet_id: WalletId;
  auth_pin: WalletPin;

  check: OnfidoCheckResult;
};

export type SaveOnfidoCheckResult =
  | { Saved: null }
  | { InvalidAuth: null }
  | { Failed: string };

export type LoadOnfidoCheck = {
  wallet_id: WalletId;
  auth_pin: WalletPin;
};

export type LoadOnfidoCheckResult =
  | { Loaded: OnfidoCheckResult }
  | { NotFound: null }
  | { InvalidAuth: null }
  | { Failed: string };

/**
 * @see import('src/app/services/onfido.service.ts').Check
 */
export type OnfidoCheckResult = {
  id: string;

  href: string;

  // Docs: <https://documentation.onfido.com/v2/#report-results>
  result: string;

  // Docs: <https://documentation.onfido.com/v2/#sub-results-document-reports>
  sub_result?: string;
};

/** Dispatching enum for action requests. */
export type WalletRequest =
  | { CreateWallet: CreateWallet }
  | { OpenWallet: OpenWallet }
  | { GetXrplWallet: GetXrplWallet }
  | { SignTransaction: SignTransaction }
  | { SaveOnfidoCheck: SaveOnfidoCheck }
  | { LoadOnfidoCheck: LoadOnfidoCheck };

/** Dispatching enum for action results. */
export type WalletResponse =
  | { CreateWallet: CreateWalletResult }
  | { OpenWallet: OpenWalletResult }
  | { GetXrplWallet: GetXrplWalletResult }
  | { SignTransaction: SignTransactionResult }
  | { SaveOnfidoCheck: SaveOnfidoCheckResult }
  | { LoadOnfidoCheck: LoadOnfidoCheckResult };
