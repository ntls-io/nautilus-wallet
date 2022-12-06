import { Transaction, TransactionMetadata } from 'xrpl';
import { ResponseOnlyTxInfo } from 'xrpl/dist/npm/models/common';

export interface History {
  meta: string | TransactionMetadata;
  tx?: Transaction & ResponseOnlyTxInfo;
  validated: boolean;
}

export function createHistory(params: Partial<History>) {
  return {} as History;
}
