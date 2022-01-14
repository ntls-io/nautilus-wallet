/**
 * Supporting code from the algosdk examples / utils.
 */

import { Algodv2, EncodedSignedTransaction } from 'algosdk';

export type TransactionConfirmation = {
  txn: EncodedSignedTransaction;
  confirmedRound: number;
  txId: string;
};

/** Subset of algosdk's PendingTransactionResponse, without bigint. */
type PendingInfo = {
  poolError: string;
  txn: EncodedSignedTransaction;
  confirmedRound?: number;
};

/**
 * Wait for a transaction to be confirmed.
 *
 * This is a cleaned-up version of:
 * https://github.com/algorand/js-algorand-sdk/blob/v1.11.1/examples/utils.js#L67
 */
export const waitForConfirmation = async (
  algodClient: Algodv2,
  txId: string,
  timeoutRounds: number
): Promise<TransactionConfirmation> => {
  const lastRound = await getLastRound(algodClient);

  const startRound = lastRound + 1;
  const endRound = startRound + timeoutRounds;
  for (let nextRound = startRound; nextRound < endRound; nextRound++) {
    // TODO: This throws a 404 error for txId not found: handle / report that better.
    const pendingInfo = await getPendingInfo(algodClient, txId);
    const { poolError, txn, confirmedRound } = pendingInfo;

    if (confirmedRound && 0 < confirmedRound) {
      // Transaction confirmed!
      return { confirmedRound, txn, txId };
    } else if (poolError !== '') {
      // TODO: Report rejections better.
      throw new Error(
        `Transaction ${txId} rejected - pool error: ${poolError}`
      );
    }

    await algodClient.statusAfterBlock(nextRound).do();
  }

  // TODO: Handle timeouts better.
  throw new Error(
    `Transaction ${txId} not confirmed after ${timeoutRounds} rounds`
  );
};

/** Helper: Get the node's last (most current) round. */
const getLastRound = async (algodClient: Algodv2): Promise<number> => {
  // Docs: https://developer.algorand.org/docs/reference/rest-apis/algod/v2/#get-v2status
  // See also: algosdk NodeStatusResponse
  const nodeStatus = await algodClient.status().do();
  return checkNumber(nodeStatus['last-round']);
};

const getPendingInfo = async (
  algodClient: Algodv2,
  txId: string
): Promise<PendingInfo> => {
  // Docs: https://developer.algorand.org/docs/reference/rest-apis/algod/v2/#get-v2transactionspendingtxid
  // See also: algosdk PendingTransactionResponse
  const pendingInfo = await algodClient
    .pendingTransactionInformation(txId)
    .do();

  const poolError = checkString(pendingInfo['pool-error']);
  const txn = pendingInfo.txn;
  const confirmedRound =
    'confirmed-round' in pendingInfo
      ? checkNumber(pendingInfo['confirmed-round'])
      : undefined;

  return { poolError, txn, confirmedRound };
};

const checkNumber = (value: unknown): number => {
  if (typeof value === 'number') {
    return value;
  } else {
    const message = `waitForConfirmation: expected number, got ${typeof value}`;
    console.error(message, value);
    throw new TypeError(`${message}: ${value}`);
  }
};
const checkString = (value: unknown): string => {
  if (typeof value === 'string') {
    return value;
  } else {
    const message = `waitForConfirmation: expected string, got ${typeof value}`;
    console.error(message, value);
    throw new TypeError(`${message}: ${value}`);
  }
};
