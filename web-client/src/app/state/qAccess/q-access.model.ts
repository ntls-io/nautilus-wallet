export interface QAccess {
  walletAddress: string;
  preferedName: string | null;
  id?: string;
}

export const createQAccess = (params: Partial<QAccess>) => ({} as QAccess);
