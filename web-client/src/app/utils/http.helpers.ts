import { environment } from 'src/environments/environment';

export const createUrlWith = (path: string): string =>
  new URL(path, environment.nautilusWalletServer).toString();
