export interface OtpRecipient {
  id: string;
  wallet_id: string;
  recipient: string;
}

export const createOtpRecipient = (params: Partial<OtpRecipient>): OtpRecipient => ({

  } as OtpRecipient);
