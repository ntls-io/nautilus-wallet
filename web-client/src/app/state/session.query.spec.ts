import { firstValueFrom, Observable } from 'rxjs';
import {
  convertToAlgos,
  convertToMicroAlgos,
} from 'src/app/services/algosdk.utils';
import { WalletDisplay } from 'src/schema/entities';
import { stubActiveSession } from 'src/tests/state.helpers';
import { SessionQuery } from './session.query';
import { SessionState, SessionStore } from './session.store';

describe('SessionQuery', () => {
  let store: SessionStore;
  let query: SessionQuery;

  beforeEach(() => {
    store = new SessionStore();
    query = new SessionQuery(store);
  });

  it('should create an instance', () => {
    expect(query).toBeTruthy();
  });

  const stubState = (): Required<SessionState> => {
    const wallet: WalletDisplay = {
      wallet_id: 'id',
      owner_name: 'name',
      algorand_address_base32: 'address',
      xrpl_account: {
        key_type: 'secp256k1',
        public_key_hex: 'public key',
        address_base58: 'address',
      },
    };
    const state: Required<SessionState> = {
      wallet,
      pin: 'secret',
      algorandAccountData: {
        address: 'address',
        amount: convertToMicroAlgos(1),
        assets: [{ amount: 100, 'asset-id': 5, 'is-frozen': false }],
      },
      algorandAssetParams: {
        5: {
          creator: 'asset creator',
          decimals: 2,
          name: 'Percent',
          'unit-name': 'PCT',
          total: 10_000,
        },
      },
    };
    store.update(state);
    return state;
  };

  const get = async <T>(source: Observable<T>): Promise<T> =>
    await firstValueFrom(source);

  describe('root state fields', () => {
    it('wallet', async () => {
      expect(await get(query.wallet)).toBeUndefined();
      const stub = stubState();
      expect(await get(query.wallet)).toEqual(stub.wallet);
    });

    it('pin', async () => {
      expect(await get(query.pin)).toBeUndefined();
      const stub = stubState();
      expect(await get(query.pin)).toBe(stub.pin);
    });

    it('algorandAccountData', async () => {
      expect(await get(query.algorandAccountData)).toBeUndefined();
      const stub = stubState();
      expect(await get(query.algorandAccountData)).toEqual(
        stub.algorandAccountData
      );
    });
  });

  describe('wallet fields', () => {
    it('walletId', async () => {
      expect(await get(query.walletId)).toBeUndefined();
      const stub = stubState();
      expect(await get(query.walletId)).toBe(stub.wallet.wallet_id);
    });

    it('name', async () => {
      expect(await get(query.name)).toBeUndefined();
      const stub = stubState();
      expect(await get(query.name)).toBe(stub.wallet.owner_name);
    });

    it('algorandAddressBase32', async () => {
      expect(await get(query.algorandAddressBase32)).toBeUndefined();
      const stub = stubState();
      expect(await get(query.algorandAddressBase32)).toBe(
        stub.wallet.algorand_address_base32
      );
    });
  });

  describe('algorandAccountData fields', () => {
    it('algorandBalanceInMicroAlgos', async () => {
      expect(await get(query.algorandBalanceInMicroAlgos)).toBeUndefined();
      const stub = stubState();
      expect(await get(query.algorandBalanceInMicroAlgos)).toBe(
        stub.algorandAccountData.amount
      );
    });

    it('algorandBalanceInAlgos', async () => {
      expect(await get(query.algorandBalanceInAlgos)).toBeUndefined();
      const stub = stubState();
      expect(await get(query.algorandBalanceInAlgos)).toBe(
        convertToAlgos(stub.algorandAccountData.amount)
      );
    });
  });

  describe('non-observable accessors', () => {
    it('getAlgorandBalanceInMicroAlgos', () => {
      expect(query.getAlgorandBalanceInMicroAlgos()).toBeUndefined();
      const stub = stubState();
      expect(query.getAlgorandBalanceInMicroAlgos()).toBe(
        stub.algorandAccountData.amount
      );
    });

    it('getAlgorandBalanceInAlgos', () => {
      expect(query.getAlgorandBalanceInAlgos()).toBeUndefined();
      const stub = stubState();
      expect(query.getAlgorandBalanceInAlgos()).toBe(
        convertToAlgos(stub.algorandAccountData.amount)
      );
    });

    it('hasAlgorandBalance', () => {
      expect(query.hasAlgorandBalance()).toBeFalse();
      stubState();
      expect(query.hasAlgorandBalance()).toBeTrue();
    });
  });

  describe('isActive', () => {
    it('empty session', () => {
      expect(query.isActiveSession()).toBeFalse();
    });

    it('wallet undefined', () => {
      stubActiveSession(store);
      store.update({ wallet: undefined });
      expect(query.isActiveSession()).toBeFalse();
    });

    it('pin undefined', () => {
      stubActiveSession(store);
      store.update({ pin: undefined });
      expect(query.isActiveSession()).toBeFalse();
    });

    it('active session', () => {
      stubActiveSession(store);
      expect(query.isActiveSession()).toBeTrue();
    });
  });

  describe('assumeSession', () => {
    it('empty session', () => {
      expect(() => query.assumeActiveSession()).toThrowError(
        'SessionAlgorandService.assumeSession: invalid state: wallet not defined'
      );
    });

    it('wallet undefined', () => {
      stubActiveSession(store);
      store.update({ wallet: undefined });
      expect(() => query.assumeActiveSession()).toThrowError(
        'SessionAlgorandService.assumeSession: invalid state: wallet not defined'
      );
    });

    it('pin undefined', () => {
      stubActiveSession(store);
      store.update({ pin: undefined });
      expect(() => query.assumeActiveSession()).toThrowError(
        'SessionAlgorandService.assumeSession: invalid state: pin not defined'
      );
    });

    it('active session', () => {
      stubActiveSession(store);
      expect(query.assumeActiveSession()).toEqual({
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
  });
});
