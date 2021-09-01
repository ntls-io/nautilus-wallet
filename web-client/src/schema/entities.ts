/** Structures representing various entities. */

import {
  AlgorandAccountSeedBytes,
  AlgorandAddressBase32,
  Bytes,
  WalletId,
} from './types';

/** A Nautilus wallet's basic displayable details. */
export type WalletDisplay = {
  wallet_id: WalletId;
  owner_name: string;
  algorand_address_base32: AlgorandAddressBase32;
};

/** An Algorand account. */
export type AlgorandAccount = {
  seed_bytes: AlgorandAccountSeedBytes;
};

/** An unsigned Algorand transaction.*/
export type AlgorandTransaction = {
  transaction_bytes: Bytes;
};

/** An signed Algorand transaction.*/
export type AlgorandTransactionSigned = {
  signed_transaction_bytes: Bytes;
};
