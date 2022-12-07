export interface Bookmark {
  name: string;
  address: string;
}

export interface CreateBookmark {
  wallet_id: string;
  bookmark: Bookmark;
}

export function createBookmark(params: Partial<Bookmark>) {
  return {} as Bookmark;
}
