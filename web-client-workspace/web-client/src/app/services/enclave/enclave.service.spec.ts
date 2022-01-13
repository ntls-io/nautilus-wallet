import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  CreateWallet,
  CreateWalletResult,
  OpenWallet,
  OpenWalletResult,
  SignTransaction,
  SignTransactionResult,
  WalletRequest,
  WalletResponse,
} from 'nautilus-wallet-client-core/schema/actions';
import { environment } from 'src/environments/environment';
import { AttestationReport } from 'src/schema/attestation';
import { TweetNaClCrypto } from 'src/schema/crypto';
import { from_msgpack_as, to_msgpack_as } from 'src/schema/msgpack';
import {
  SealedMessage,
  seal_msgpack_as,
  unseal_msgpack_as,
} from 'src/schema/sealing';
import {
  withNestedResolveContexts,
  withResolveContext,
} from 'src/tests/test.helpers';
import {
  arrayViewFromBuffer,
  bufferFromArrayView,
  EnclaveService,
} from './enclave.service';

describe('EnclaveService', () => {
  let service: EnclaveService;

  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(EnclaveService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getEnclaveReport', async () => {
    const stubReport = stubAttestationReport();

    const report = await withResolveContext(
      service.getEnclaveReport(),
      stubbedEnclaveReport(httpTestingController, stubReport)
    );

    await expect(report).toEqual(stubReport);
  });

  it('getEnclavePublicKey', async () => {
    const stubReport = stubAttestationReport();

    const report = await withResolveContext(
      service.getEnclavePublicKey(),
      stubbedEnclaveReport(httpTestingController, stubReport)
    );

    await expect(report).toEqual(stubReport.enclave_public_key);
  });

  describe('createWallet', () => {
    const requestCreate: CreateWallet = {
      owner_name: 'Test Owner',
      auth_pin: '1234',
    };

    it('Created', async () => {
      const stubResultCreated: CreateWalletResult = {
        Created: {
          wallet_id: 'dummy wallet id',
          owner_name: requestCreate.owner_name,
          algorand_address_base32: 'dummy algorand address',
        },
      };
      const result = await simulateWalletOperation(
        httpTestingController,
        service.createWallet(requestCreate),
        { CreateWallet: requestCreate },
        { CreateWallet: stubResultCreated }
      );
      await expect(result).toEqual(stubResultCreated);
    });

    it('Failed', async () => {
      const stubResultFailed: CreateWalletResult = {
        Failed: 'failed to create wallet',
      };
      const result = await simulateWalletOperation(
        httpTestingController,
        service.createWallet(requestCreate),
        { CreateWallet: requestCreate },
        { CreateWallet: stubResultFailed }
      );
      await expect(result).toEqual(stubResultFailed);
    });
  });

  describe('openWallet', () => {
    const requestOpen: OpenWallet = {
      wallet_id: 'dummy wallet id',
      auth_pin: '1234',
    };

    it('Opened', async () => {
      const stubResultOpened: OpenWalletResult = {
        Opened: {
          wallet_id: 'dummy wallet id',
          owner_name: 'dummy owner name',
          algorand_address_base32: 'dummy algorand address',
        },
      };
      const result = await simulateWalletOperation(
        httpTestingController,
        service.openWallet(requestOpen),
        { OpenWallet: requestOpen },
        { OpenWallet: stubResultOpened }
      );
      await expect(result).toEqual(stubResultOpened);
    });

    it('InvalidAuth', async () => {
      const stubResultInvalidAuth: OpenWalletResult = {
        InvalidAuth: null,
      };
      const result = await simulateWalletOperation(
        httpTestingController,
        service.openWallet(requestOpen),
        { OpenWallet: requestOpen },
        { OpenWallet: stubResultInvalidAuth }
      );
      await expect(result).toEqual(stubResultInvalidAuth);
    });

    it('Failed', async () => {
      const stubResultFailed: OpenWalletResult = {
        Failed: 'failed to open wallet',
      };
      const result = await simulateWalletOperation(
        httpTestingController,
        service.openWallet(requestOpen),
        { OpenWallet: requestOpen },
        { OpenWallet: stubResultFailed }
      );
      await expect(result).toEqual(stubResultFailed);
    });
  });

  describe('signTransaction', () => {
    const requestSign: SignTransaction = {
      wallet_id: 'dummy wallet id',
      auth_pin: '1234',
      algorand_transaction_bytes: new TextEncoder().encode(
        'dummy unsigned transaction'
      ),
    };

    it('Signed', async () => {
      const stubResultSigned: SignTransactionResult = {
        Signed: {
          signed_transaction_bytes: new TextEncoder().encode(
            'dummy signed transaction'
          ),
        },
      };
      const result = await simulateWalletOperation(
        httpTestingController,
        service.signTransaction(requestSign),
        { SignTransaction: requestSign },
        { SignTransaction: stubResultSigned }
      );
      await expect(result).toEqual(stubResultSigned);
    });

    it('InvalidAuth', async () => {
      const stubResultInvalidAuth: SignTransactionResult = {
        InvalidAuth: null,
      };
      const result = await simulateWalletOperation(
        httpTestingController,
        service.signTransaction(requestSign),
        { SignTransaction: requestSign },
        { SignTransaction: stubResultInvalidAuth }
      );
      await expect(result).toEqual(stubResultInvalidAuth);
    });

    it('Failed', async () => {
      const stubResultFailed: SignTransactionResult = {
        Failed: 'failed to open wallet',
      };
      const result = await simulateWalletOperation(
        httpTestingController,
        service.signTransaction(requestSign),
        { SignTransaction: requestSign },
        { SignTransaction: stubResultFailed }
      );
      await expect(result).toEqual(stubResultFailed);
    });
  });
});

/**
 * Simulate a sealed wallet operation exchange.
 *
 * This expects the operation to call the `enclave-report` and `wallet-operation` endpoints in sequence.
 *
 * @param httpTestingController (from Angular)
 * @param walletOperation Promise for the initiated wallet operation
 * @param expectedWalletRequest The unsealed wallet operation request to expect
 * @param stubWalletResponse The unsealed wallet operation response to seal and return
 */
const simulateWalletOperation = async <R>(
  httpTestingController: HttpTestingController,
  walletOperation: Promise<R>,
  expectedWalletRequest: WalletRequest,
  stubWalletResponse: WalletResponse
): Promise<R> => {
  const simulatedEnclaveCrypto = TweetNaClCrypto.new();
  const stubReport = stubAttestationReport(simulatedEnclaveCrypto.public_key);
  return await withNestedResolveContexts(walletOperation, [
    stubbedEnclaveReport(httpTestingController, stubReport),
    stubbedWalletOperation(
      httpTestingController,
      simulatedEnclaveCrypto,
      expectedWalletRequest,
      stubWalletResponse
    ),
  ]);
};

/**
 * Return a callable that stubs the `enclave-report` endpoint
 *
 * @param httpTestingController (from Angular)
 * @param stubReport The enclave report to return
 */
const stubbedEnclaveReport =
  (
    httpTestingController: HttpTestingController,
    stubReport: AttestationReport
  ): (() => void) =>
  () => {
    const url = new URL(
      'enclave-report',
      environment.nautilusWalletServer
    ).toString();

    const stubReportBytes = to_msgpack_as<AttestationReport>(stubReport);
    const stubReportBuffer = bufferFromArrayView(stubReportBytes);

    httpTestingController
      .expectOne({ method: 'GET', url })
      .flush(stubReportBuffer);
  };

/**
 * Return a callable that stubs a sealed `wallet-operation` exchange.
 *
 * @param httpTestingController (from Angular)
 * @param simulatedEnclaveCrypto The crypto instance to simulate the enclave's message sealing with
 * @param expectedWalletRequest The unsealed wallet operation request to expect
 * @param stubWalletResponse The unsealed wallet operation response to seal and return
 */
const stubbedWalletOperation =
  (
    httpTestingController: HttpTestingController,
    simulatedEnclaveCrypto: TweetNaClCrypto,
    expectedWalletRequest: WalletRequest,
    stubWalletResponse: WalletResponse
  ): (() => void) =>
  () => {
    const url = new URL(
      'wallet-operation',
      environment.nautilusWalletServer
    ).toString();

    const httpRequest = httpTestingController.expectOne({
      method: 'POST',
      url,
    });
    const sealedMessageBytes = arrayViewFromBuffer(httpRequest.request.body);
    const walletRequest: WalletRequest | null = unseal_msgpack_as(
      sealedMessageBytes,
      simulatedEnclaveCrypto
    );
    expect(walletRequest).not.toBeNull();
    expect(walletRequest).toEqual(expectedWalletRequest);

    const { sender_public_key } =
      from_msgpack_as<SealedMessage>(sealedMessageBytes);
    const stubResultBytes = seal_msgpack_as<WalletResponse>(
      stubWalletResponse,
      sender_public_key,
      simulatedEnclaveCrypto
    );
    const stubResultBuffer = bufferFromArrayView(stubResultBytes);
    httpRequest.flush(stubResultBuffer);
  };

/** Construct a stub AttestationReport value. */
const stubAttestationReport = (
  enclavePublicKey: Uint8Array = new Uint8Array(32)
): AttestationReport => ({
  enclave_public_key: enclavePublicKey,
  report: {
    body: {
      cpu_svn: new Uint8Array(16),
      isv_ext_prod_id: new Uint8Array(16),
      attributes_flags: 0,
      attributes_xfrm: 0,
      mr_enclave: new Uint8Array(32),
      mr_signer: new Uint8Array(32),
      config_id: new Uint8Array(16),
      isv_prod_id: 0,
      isv_svn: 0,
      config_svn: 0,
      isv_family_id: new Uint8Array(16),
      report_data: new Uint8Array(64),
    },
    key_id: new Uint8Array(32),
    mac: new Uint8Array(16),
  },
});

describe('EnclaveService array helpers', () => {
  const nonArrayExamples: Array<[string, unknown]> = [
    ['undefined', undefined],
    ['null', null],
    ['false', false],
    ['true', false],
    ['zero', 0],
    ['empty string', ''],
    ['[]]', []],
    ['{}}', {}],
    ['number', 42],
    ['string', 'spam'],
    ['Array', [1, 2, 3]],
    ['Object', { ham: 'spam' }],
  ];

  describe('arrayViewFromBuffer', () => {
    describe('converts ArrayBuffer', () => {
      for (const [label, buffer, expected] of [
        ['empty', new ArrayBuffer(0), new Uint8Array()],
        ['zeroes', new ArrayBuffer(5), new Uint8Array(5)],
        ['values', new Uint8Array([1, 2, 3]).buffer, new Uint8Array([1, 2, 3])],
      ] as Array<[string, ArrayBuffer, Uint8Array]>) {
        it(label, () => {
          expect(arrayViewFromBuffer(buffer)).toEqual(expected);
        });
      }
    });

    describe('rejects other types', () => {
      for (const [label, value] of [
        ...nonArrayExamples,
        ['Uint8Array', new Uint8Array()],
        ['Uint8Array(5)', new Uint8Array(5)],
      ] as Array<[string, unknown]>) {
        it(label, () => {
          expect(() => arrayViewFromBuffer(value as ArrayBuffer)).toThrowError(
            TypeError,
            'expected ArrayBuffer'
          );
        });
      }
    });
  });

  describe('bufferFromArrayView', () => {
    describe('converts Uint8Array', () => {
      for (const [label, array, expected] of [
        ['empty', new Uint8Array(), new ArrayBuffer(0)],
        ['zeroes', new Uint8Array(5), new ArrayBuffer(5)],
        ['values', new Uint8Array([1, 2, 3]), new Uint8Array([1, 2, 3]).buffer],
        // XXX: The following case is important.
        [
          'sliced view',
          new Uint8Array(new Uint8Array([1, 2, 3, 4, 5]).buffer, 1, 3),
          new Uint8Array([2, 3, 4]).buffer,
        ],
      ] as Array<[string, Uint8Array, ArrayBuffer]>) {
        it(label, () => {
          // XXX: Unlike Uint8Array, ArrayBuffers can't be directly compared with toEqual.
          //      Instead, we compare the buffers by comparing their full (unsliced) Uint8Array views.
          const actual = bufferFromArrayView(array);
          expect(new Uint8Array(actual)).toEqual(new Uint8Array(expected));
        });
      }
    });

    describe('rejects other types', () => {
      for (const [label, value] of [
        ...nonArrayExamples,
        ['ArrayBuffer', new ArrayBuffer(0)],
        ['ArrayBuffer(5)', new ArrayBuffer(5)],
        ['Int8Array', new Int8Array()],
        ['Uint16Array', new Uint16Array()],
      ] as Array<[string, unknown]>) {
        it(label, () => {
          expect(() => bufferFromArrayView(value as Uint8Array)).toThrowError(
            TypeError,
            'expected Uint8Array'
          );
        });
      }
    });
  });
});
