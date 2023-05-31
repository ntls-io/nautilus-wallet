/* eslint-disable max-len -- long URL in comment */
/**
 * Supporting code for XRPL.
 *
 * In particular, this provides a stand-alone implementation of the transaction
 * signing logic that's otherwise tied up in the XRPL.js wallet code.
 *
 * @todo We should look at migrating this logic entirely into the enclave?
 *
 * @see https://github.com/XRPLF/xrpl-dev-portal/blob/master/content/concepts/payment-system-basics/transaction-basics/understanding-signatures-draft.md
 * @see https://xrpl.org/serialization.html
 * @see https://github.com/XRPLF/xrpl.js/blob/xrpl%402.2.1/packages/xrpl/src/Wallet/index.ts#L257-L305
 */

import { bytesToHex, hexToBytes } from 'ripple-keypairs/dist/utils';
import { panic } from 'src/app/utils/errors/panic';
import * as xrpl from 'xrpl';

/**
 * Convenience type alias for simple hex-encoded binary data,
 * as used throughout XRPL.
 */
export type HexString = string;

/**
 * Prepare to sign `txnUnsigned` with `signingPubKey`.
 *
 * This returns:
 *
 * - `txnBeingSigned`: `txnUnsigned` with `SigningPubKey` added
 *
 * - `bytesToSignEncoded`: As encoded by {@link xrpl.encodeForSigning},
 *   ready for signature calculation
 */
export const txnBeforeSign = (
  txnUnsigned: xrpl.Transaction,
  signingPubKey: HexString
): { txnBeingSigned: xrpl.Transaction; bytesToSignEncoded: HexString } => {
  const txnBeingSigned: xrpl.Transaction = {
    ...txnUnsigned,
    SigningPubKey: signingPubKey,
  };
  return {
    txnBeingSigned,
    bytesToSignEncoded: xrpl.encodeForSigning(txnBeingSigned),
  };
};

/**
 * Combine `txnBeingSigned` with its `txnSignature`
 *
 * This returns:
 *
 * - `txnSigned`: `txnBeingSigned` with `TxnSignature` added
 * - `txnSignedEncoded`: As encoded by {@link xrpl.encode},
 *   ready for submission
 */
export const txnAfterSign = (
  txnBeingSigned: xrpl.Transaction,
  txnSignature: HexString
): { txnSigned: xrpl.Transaction; txnSignedEncoded: HexString } => {
  const txnSigned: xrpl.Transaction = {
    ...txnBeingSigned,
    TxnSignature: txnSignature,
  };
  return { txnSigned, txnSignedEncoded: xrpl.encode(txnSigned) };
};

/**
 * Like {@link hexToBytes}, but produce {@link Uint8Array}.
 */
export const hexToUint8Array = (hex: HexString): Uint8Array =>
  Uint8Array.from(hexToBytes(hex));

/**
 * Like {@link bytesToHex}, but consume {@link Uint8Array}.
 *
 * This mainly exists to work around this bug:
 * - <https://github.com/XRPLF/xrpl.js/pull/1975>
 */
export const uint8ArrayToHex = (array: Uint8Array): HexString =>
  bytesToHex(Array.from(array));

// Background: https://xrpl.org/reliable-transaction-submission.html#verification

export type TxSuccessReport = {
  succeeded: boolean;
  resultCode: xrpl.TransactionMetadata['TransactionResult'];
};

/** Check whether a transaction succeeded, by response. */
export const checkTxResponseSucceeded = (
  txResponse: xrpl.TxResponse
): TxSuccessReport =>
  checkTransactionMetadataSucceeded(getTxResponseMetadata(txResponse));

/** Check whether a transaction succeeded, by metadata. */
export const checkTransactionMetadataSucceeded = (
  meta: xrpl.TransactionMetadata
): TxSuccessReport => ({
  succeeded: meta.TransactionResult === 'tesSUCCESS',
  resultCode: meta.TransactionResult,
});

/** Get transaction metadata from response, or panic. */
export const getTxResponseMetadata = (
  txResponse: xrpl.TxResponse
): xrpl.TransactionMetadata => {
  const meta = txResponse.result.meta;
  if (typeof meta === 'string') {
    throw panic('getTxResponseMetadata: unexpected string meta:', {
      txResponse,
    });
  } else if (meta === undefined) {
    throw panic('getTxResponseMetadata: unexpected undefined meta:', {
      txResponse,
    });
  } else {
    return meta;
  }
};

/**
 * Check for `RippledError`, and extract its error response.
 *
 * This verifies that {@link xrpl.ErrorResponse.status} is `"error"`, at least.
 */
export const checkRippledErrorResponse = (
  err: xrpl.RippledError | unknown
): xrpl.ErrorResponse | undefined => {
  if (err instanceof xrpl.RippledError) {
    const maybeResponse = err.data as xrpl.ErrorResponse | any;
    if (
      typeof maybeResponse === 'object' &&
      'status' in maybeResponse &&
      maybeResponse.status === 'error'
    ) {
      return maybeResponse as xrpl.ErrorResponse;
    }
  }
};
