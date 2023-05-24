export interface OtpLimit {
  id: string;
  wallet_id: string;
  currency_code: string;
  limit: number;
}

export const createOtpLimit = (params: Partial<OtpLimit>): OtpLimit =>
  ({} as OtpLimit);
