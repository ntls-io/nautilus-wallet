/** Supporting data types. */

export type Bytes = Uint8Array;

// Helpers for documentation:
// XXX: See: Add Length Parameter to typed arrays #18471 https://github.com/microsoft/TypeScript/issues/18471
export type Bytes32 = Bytes;
export type Bytes24 = Bytes;

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
