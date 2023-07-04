export interface RecurringPay {
  id: string;
  wallet_id: string;
  wallet_public_key: string;
  recipient: string;
  amount: number;
  currency_code: string;
  payment_start_date: number;
  frequency: number;
  payment_end_date: number;
  last_paid_date: number;
}
export const createRecurringPay = (params: Partial<RecurringPay>) =>
  ({} as RecurringPay);
