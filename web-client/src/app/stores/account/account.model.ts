import { ID } from '@datorama/akita';

export interface Account {
  walletId: ID;
  currency: string;
  symbol: string;
  code: string;
  balance: number | null;
}

export function createAccount(params: Partial<Account>) {
  return {} as Account;
}
