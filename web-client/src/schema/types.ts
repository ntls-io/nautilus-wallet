/** Supporting data types. */

export type Bytes = Uint8Array;

// Helpers for documentation:
// XXX: See: Add Length Parameter to typed arrays #18471 https://github.com/microsoft/TypeScript/issues/18471
export type Bytes32 = Bytes;
export type Bytes24 = Bytes;
export type Bytes16 = Bytes;

/** Nautilus Wallet ID. */
export type WalletId = string;

/** A wallet owner's authenticating PIN. */
export type WalletPin = string;

/** Algorand account seed, as bytes. */
export type AlgorandAccountSeedBytes = Bytes32;

/** Algorand account address, as bytes. */
export type AlgorandAddressBytes = Bytes32;

/** Algorand account address, as base32 with checksum. */
export type AlgorandAddressBase32 = string;

/**
 * XRP key type (signing algorithm).
 *
 * Docs: <https://xrpl.org/cryptographic-keys.html#signing-algorithms>
 */
export type XrplKeyType = 'secp256k1' | 'ed25519';

/**
 *  XRP account seed, as bytes.
 */
export type XrpAccountSeedBytes = Bytes16;

/**
 *  XRP account address, as base58 with checksum ("Base58Check").
 *
 *  Docs: <https://xrpl.org/base58-encodings.html>
 */
export type XrplAddressBase58 = string;

/**
 *  XRP public key, as a hexadecimal string. Used to prepare unsigned transactions.
 *
 *  Docs: <https://xrpl.org/cryptographic-keys.html#public-key>
 */
export type XrplPublicKeyHex = string;
