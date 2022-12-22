import { Transaction, TransactionMetadata } from 'xrpl';

export interface History {
  meta: string | TransactionMetadata;
  tx?: Transaction & {
    Destination?: string;
    Amount?: {
      currency?: string;
      value?: string;
    };
    date?: number;
    hash?: string;
    ledger_index?: number;
  };
  validated: boolean;
}

export const createHistory = (params: Partial<History>) => ({} as History);
