export interface Bookmark {
  id: string;
  wallet_id: string;
  name: string;
  address: string;
}

export function createBookmark(params: Partial<Bookmark>) {
  return {} as Bookmark;
}
