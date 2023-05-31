import { SessionQuery } from 'src/app/state/session.query';
import { SessionStore } from 'src/app/state/session.store';
import { WalletDisplay } from 'src/schema/entities';
import { stubActiveSession } from 'src/tests/state.helpers';

describe('stubActiveSession', () => {
  let store: SessionStore;

  beforeEach(() => {
    store = new SessionStore();
  });

  it('creates active session', () => {
    const query = new SessionQuery(store);
    expect(query.isActiveSession()).toBeFalse();
    stubActiveSession(store);
    expect(query.isActiveSession()).toBeTrue();
  });

  it('sets stub values', () => {
    stubActiveSession(store);
    expect(store.getValue()).toEqual({
      wallet: {
        wallet_id: 'stub',
        owner_name: 'stub',
        algorand_address_base32: 'stub',
        xrpl_account: {
          key_type: 'secp256k1',
          public_key_hex: 'stub',
          address_base58: 'stub',
        },
      },
      pin: 'stub',
    });
  });

  it('allows overriding values', () => {
    const wallet: WalletDisplay = {
      wallet_id: 'id',
      owner_name: 'name',
      algorand_address_base32: 'address',
      xrpl_account: {
        key_type: 'ed25519',
        public_key_hex: 'public key',
        address_base58: 'address',
      },
    };
    const pin = 'secret';
    stubActiveSession(store, { wallet, pin });
    expect(store.getValue()).toEqual({ wallet, pin });
  });
});
