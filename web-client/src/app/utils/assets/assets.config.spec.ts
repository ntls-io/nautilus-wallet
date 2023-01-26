import { LedgerInfo } from './assets.common';
import { AssetConfigs, getAssetConfigForLedgerInfo } from './assets.config';
import { LEDGER_INFO_XRP } from './assets.xrp';
import { ledgerInfoXrplToken } from './assets.xrp.token';

describe('getConfigForLedgerInfo', () => {
  const exampleConfigs: AssetConfigs = {
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
