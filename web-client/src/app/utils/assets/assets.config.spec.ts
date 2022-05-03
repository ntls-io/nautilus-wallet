import { LEDGER_INFO_ALGO } from './assets.algo';
import { ledgerInfoAsa } from './assets.algo.asa';
import { LedgerInfo } from './assets.common';
import { AssetConfigs, getAssetConfigForLedgerInfo } from './assets.config';
import { LEDGER_INFO_XRP } from './assets.xrp';
import { ledgerInfoXrplToken } from './assets.xrp.token';

describe('getConfigForLedgerInfo', () => {
  const exampleConfigs: AssetConfigs = {
    Algorand: {
      ALGO: { transactionLimitWithoutOnfidoCheck: 100 },
      ASA: {
        5: { transactionLimitWithoutOnfidoCheck: 200 },
      },
    },
    XRPL: {
      XRP: { transactionLimitWithoutOnfidoCheck: 300 },
      XrplToken: {
        SPAM: { transactionLimitWithoutOnfidoCheck: 400 },
      },
    },
  };

  const examples: [
    LedgerInfo,
    ReturnType<typeof getAssetConfigForLedgerInfo>
  ][] = [
    [LEDGER_INFO_ALGO, { transactionLimitWithoutOnfidoCheck: 100 }],
    [ledgerInfoAsa(5, 2), { transactionLimitWithoutOnfidoCheck: 200 }],
    [ledgerInfoAsa(3, 2), undefined],
    [LEDGER_INFO_XRP, { transactionLimitWithoutOnfidoCheck: 300 }],
    [
      ledgerInfoXrplToken('SPAM', 'spammer'),
      { transactionLimitWithoutOnfidoCheck: 400 },
    ],
    [ledgerInfoXrplToken('UNKNOWN', 'unknown'), undefined],
    [{ type: 'unknown' }, undefined],
  ];

  describe('with configs', () => {
    for (const [ledgerInfo, expectedAssetConfig] of examples) {
      it(`${JSON.stringify(ledgerInfo)} → ${JSON.stringify(
        expectedAssetConfig
      )}`, () => {
        expect(getAssetConfigForLedgerInfo(exampleConfigs, ledgerInfo)).toEqual(
          expectedAssetConfig
        );
      });
    }
  });

  describe('empty configs', () => {
    const emptyConfigs: AssetConfigs = {};

    for (const [ledgerInfo] of examples) {
      it(`${JSON.stringify(ledgerInfo)}`, () => {
        expect(
          getAssetConfigForLedgerInfo(emptyConfigs, ledgerInfo)
        ).toBeUndefined();
      });
    }
  });
});
