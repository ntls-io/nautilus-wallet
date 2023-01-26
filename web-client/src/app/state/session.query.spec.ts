import { firstValueFrom, Observable } from 'rxjs';
import {
  AssetAmountXrp,
  assetAmountXrp,
} from 'src/app/utils/assets/assets.xrp';
import {
  AssetAmountXrplToken,
  assetAmountXrplToken,
} from 'src/app/utils/assets/assets.xrp.token';
import { parseNumber } from 'src/app/utils/validators';
import { WalletDisplay } from 'src/schema/entities';
import { stubActiveSession } from 'src/tests/state.helpers';
import * as xrpl from 'xrpl';
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

  /** `SessionState` with some required fields, for convenience. */
  type StubSessionState = SessionState &
    Pick<
      Required<SessionState>,
      'wallet' | 'pin' | 'xrplAccountRoot' | 'xrplBalances' | 'onfidoCheck'
    >;

  const stubState = (): StubSessionState => {
    const wallet: WalletDisplay = {
      wallet_id: 'id',
      owner_name: 'name',
      xrpl_account: {
        key_type: 'secp256k1',
        public_key_hex: 'public key',
        address_base58: 'address',
      },
    };
    const state: StubSessionState = {
      wallet,
      pin: 'secret',
      xrplAccountRoot: {
        Balance: xrpl.xrpToDrops('1'),
      } as xrpl.LedgerEntry.AccountRoot, // XXX: Stub a partial record, for now.
      xrplBalances: [
        { value: '1', currency: 'XRP' },
        { value: '1', currency: 'PCT', issuer: 'PCT issuer' },
      ],
      onfidoCheck: {
        id: 'uuid',
        href: 'https://dashboard.onfido.com/checks/uuid',
        result: 'clear',
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

    it('xrplAccountRoot', async () => {
      expect(await get(query.xrplAccountRoot)).toBeUndefined();
      const stub = stubState();
      expect(await get(query.xrplAccountRoot)).toEqual(stub.xrplAccountRoot);
    });

    it('xrplTrustLines', async () => {
      expect(await get(query.xrplTrustlines)).toBeUndefined();
      const stub = stubState();
      expect(await get(query.xrplTrustlines)).toEqual(stub.xrplTrustlines);
    });

    it('onfidoCheck', async () => {
      expect(await get(query.onfidoCheck)).toBeUndefined();
      const stub = stubState();
      expect(await get(query.onfidoCheck)).toEqual(stub.onfidoCheck);
    });

    describe('onfidoCheckIsClear', () => {
      it('when clear', async () => {
        stubState();
        expect(await get(query.onfidoCheckIsClear)).toBeTrue();
      });

      it('not when missing', async () => {
        expect(await get(query.onfidoCheckIsClear)).toBeFalse();
      });

      it('not when consider', async () => {
        const stub = stubState();
        store.update({
          onfidoCheck: { ...stub.onfidoCheck, result: 'consider' },
        });
        expect(await get(query.onfidoCheckIsClear)).toBeFalse();
      });

      it('not when unidentified', async () => {
        const stub = stubState();
        store.update({
          onfidoCheck: { ...stub.onfidoCheck, result: 'unidentified' },
        });
        expect(await get(query.onfidoCheckIsClear)).toBeFalse();
      });
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
  });

  describe('balance fields', () => {
    const expectedXrplBalances: (AssetAmountXrp | AssetAmountXrplToken)[] = [
      assetAmountXrp(1),
      assetAmountXrplToken(1, { currency: 'PCT', issuer: 'PCT issuer' }),
    ];

    describe('XRPL balances', () => {
      it('xrplBalances', async () => {
        expect(await get(query.xrplBalances)).toBe(undefined);
        stubState();
        expect(await get(query.xrplBalances)).toEqual(expectedXrplBalances);
      });
    });

    describe('combined balances', () => {
      it('allBalances', async () => {
        expect(await get(query.allBalances)).toEqual([]);
        stubState();
      });
    });
  });

  describe('non-observable accessors', () => {
    it('getXrpBalanceInDrops', () => {
      expect(query.getXrpBalanceInDrops()).toBeUndefined();
      const stub = stubState();
      expect(query.getXrpBalanceInDrops()).toBe(
        parseNumber(stub.xrplAccountRoot.Balance)
      );
    });

    it('hasXrpBalance', () => {
      expect(query.hasXrpBalance()).toBeFalse();
      stubState();
      expect(query.hasXrpBalance()).toBeTrue();
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
});
