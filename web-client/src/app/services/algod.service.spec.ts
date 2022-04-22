import { TestBed } from '@angular/core/testing';
import { Polly } from '@pollyjs/core';
import { AlgodService } from './algod.service';

const withPolly = <T>(recordingName: string, f: (polly: Polly) => T): T => {
  const polly = new Polly(recordingName, {
    adapters: ['xhr'],
    persister: 'rest',
    logLevel: 'info', // Log requests to console
  });
  try {
    return f(polly);
  } finally {
    polly.stop();
  }
};

/**
 * Like {@link it}, but wrap the assertion in {@link withPolly}.
 */
const withPollyIt = (
  expectation: string,
  assertion: (polly: Polly) => void,
  timeout?: number
): void => {
  it(
    expectation,
    () => {
      withPolly(expectation, assertion);
    },
    timeout
  );
};

// TODO(Pi): This needs a testing strategy, but it's not trivial to instantiate an Algorand sandbox as fixture.
//           Perhaps Polly.JS around an Algorand sandbox is feasible?
describe('AlgodService', () => {
  let service: AlgodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlgodService);
  });

  it('should be created', () => {
    withPolly('AlgodService/create', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('getAccountData', () => {
    it('with empty address', async () => {
      await withPolly('AlgodService/getAccountData/empty', async () => {
        await expectAsync(service.getAccountData('')).toBeRejectedWithError(
          'Not Found'
        );
      });
    });

    it('with invalid address', async () => {
      await withPolly('AlgodService/getAccountData/invalid', async () => {
        await expectAsync(
          service.getAccountData('invalid')
        ).toBeRejectedWithError('Bad Request');
      });
    });
  });
});
