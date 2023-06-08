/** Structures representing various entities. */

import {
  AlgorandAccountSeedBytes,
  AlgorandAddressBase32,
  WalletId,
  XrplAddressBase58,
  XrplKeyType,
  XrplPublicKeyHex,
} from './types';

/** A Nautilus wallet's basic displayable details. */
export type WalletDisplay = {
  wallet_id: WalletId;
  owner_name: string;
  phone_number?: string;
  otp_phone_number?: string;

  algorand_address_base32: AlgorandAddressBase32;
  xrpl_account: XrplAccountDisplay;
};

// Algorand entities:

/** An Algorand account. */
export type AlgorandAccount = {
  seed_bytes: AlgorandAccountSeedBytes;
};

// XRPL entities:

/** An XRP account's displayable details. */
export type XrplAccountDisplay = {
  key_type: XrplKeyType;
  public_key_hex: XrplPublicKeyHex;
  address_base58: XrplAddressBase58;
};
