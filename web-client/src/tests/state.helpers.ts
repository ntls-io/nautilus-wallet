import { SessionStore } from 'src/app/state/session.store';
import { WalletDisplay } from 'src/schema/entities';

/**
 * Create a stub active session in the given session store.
 *
 * This is useful for testing routes guarded by {@link OpenWalletGuard}.
 */
export const stubActiveSession = (
  sessionStore: SessionStore,
  state?: { wallet?: Partial<WalletDisplay>; pin?: string }
): void => {
  sessionStore.update({
    wallet: {
      wallet_id: state?.wallet?.wallet_id ?? 'stub',
      owner_name: state?.wallet?.owner_name ?? 'stub',
      algorand_address_base32: state?.wallet?.algorand_address_base32 ?? 'stub',
    },
    pin: state?.pin ?? 'stub',
  });
};
