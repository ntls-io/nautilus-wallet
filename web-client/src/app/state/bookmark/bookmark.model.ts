export interface Bookmark {
  id: string;
  wallet_id: string;
  name: string;
  address: string;
}

export const createBookmark = (params: Partial<Bookmark>) => ({} as Bookmark);
