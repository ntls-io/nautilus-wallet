export interface QAccess {
  id: string;
  walletAddress: string;
  preferedName: string | null;
}

export function createQAccess(params: Partial<QAccess>) {
  return {

  } as QAccess;
}
