/** Structures representing various entities. */

import {
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
  xrpl_account: XrplAccountDisplay;
};

// XRPL entities:

/** An XRP account's displayable details. */
export type XrplAccountDisplay = {
  key_type: XrplKeyType;
  public_key_hex: XrplPublicKeyHex;
  address_base58: XrplAddressBase58;
};
