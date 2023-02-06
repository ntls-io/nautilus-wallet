export interface QAccess {
  id: string;
  walletAddress: string;
  preferedName: string | null;
}

export const createQAccess = (params: Partial<QAccess>) => ({} as QAccess);
