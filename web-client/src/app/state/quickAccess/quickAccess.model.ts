export interface QuickAccess {
  address: string;
  preferedName: string;
}

export const createQuickAccess = (params: Partial<QuickAccess>) => ({} as QuickAccess);
