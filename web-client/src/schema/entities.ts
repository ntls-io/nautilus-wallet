/** Structures representing various entities. */

import {
  AlgorandAccountSeedBytes,
  AlgorandAddressBase32,
  Bytes,
  WalletId,
  XrpAddressBase58,
  XrpKeyType,
  XrpPublicKeyHex,
} from './types';

/** A Nautilus wallet's basic displayable details. */
export type WalletDisplay = {
  wallet_id: WalletId;
  owner_name: string;
  algorand_address_base32: AlgorandAddressBase32;
  xrp_account: XrpAccountDisplay;
};

// Algorand entities:

/** An Algorand account. */
export type AlgorandAccount = {
  seed_bytes: AlgorandAccountSeedBytes;
};

/** An unsigned Algorand transaction.*/
export type AlgorandTransaction = {
  transaction_bytes: Bytes;
};

/** A signed Algorand transaction.*/
export type AlgorandTransactionSigned = {
  signed_transaction_bytes: Bytes;
};

// XRP entities:

/** An XRP account's displayable details. */
export type XrpAccountDisplay = {
  key_type: XrpKeyType;
  public_key_hex: XrpPublicKeyHex;
  address_base58: XrpAddressBase58;
};

/** A signed Algorand transaction.*/
export type XrpTransactionSigned = {
  signed_transaction_bytes: Bytes;
  signature_bytes: Bytes;
};
