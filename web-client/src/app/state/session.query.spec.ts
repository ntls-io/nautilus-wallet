import { firstValueFrom, Observable } from 'rxjs';
import {
  convertToAlgos,
  convertToMicroAlgos,
} from 'src/app/services/algosdk.utils';
import {
  assetAmountAlgo,
  AssetAmountAlgo,
} from 'src/app/utils/assets/assets.algo';
import {
  assetAmountAsa,
  AssetAmountAsa,
} from 'src/app/utils/assets/assets.algo.asa';
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
      | 'wallet'
      | 'pin'
      | 'algorandAccountData'
      | 'xrplAccountRoot'
      | 'xrplBalances'
      | 'onfidoCheck'
    >;

  const stubState = (): StubSessionState => {
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
    const state: StubSessionState = {
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

    it('algorandAccountData', async () => {
      expect(await get(query.algorandAccountData)).toBeUndefined();
      const stub = stubState();
      expect(await get(query.algorandAccountData)).toEqual(
        stub.algorandAccountData
      );
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

    it('algorandAddressBase32', async () => {
      expect(await get(query.algorandAddressBase32)).toBeUndefined();
      const stub = stubState();
      expect(await get(query.algorandAddressBase32)).toBe(
        stub.wallet.algorand_address_base32
      );
    });
  });

  describe('balance fields', () => {
    const expectedAlgoBalance: AssetAmountAlgo = assetAmountAlgo(1);

    const expectedAssetBalances: AssetAmountAsa[] = [
      assetAmountAsa(1, { assetSymbol: 'PCT', assetId: 5, decimals: 2 }),
    ];

    describe('Algorand balances', () => {
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

      it('algorandAlgoBalance', async () => {
        expect(await get(query.algorandAlgoBalance)).toBeUndefined();
        stubState();
        expect(await get(query.algorandAlgoBalance)).toEqual(
          assetAmountAlgo(1)
        );
      });

      it('algorandAssetBalances', async () => {
        expect(await get(query.algorandAssetBalances)).toBeUndefined();
        stubState();
        expect(await get(query.algorandAssetBalances)).toEqual([
          ...expectedAssetBalances,
        ]);
      });

      it('algorandBalances', async () => {
        expect(await get(query.algorandBalances)).toEqual([]);
        stubState();
        expect(await get(query.algorandBalances)).toEqual([
          expectedAlgoBalance,
          ...expectedAssetBalances,
        ]);
      });
    });

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
        expect(await get(query.allBalances)).toEqual([
          expectedAlgoBalance,
          ...expectedAssetBalances,
          ...expectedXrplBalances,
        ]);
      });
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
