import { TestBed } from '@angular/core/testing';
import { sign } from 'ripple-keypairs';
import { RippleAPI } from 'ripple-lib';
import { XrplService } from './xrpl.service';

describe('XrplService', () => {
  let service: XrplService;
  const address = 'r4442Uyod51PqEkYh2EwxViBmcVw9kuPE9';
  const secret = 'shLaVojVmVwbXtBCpmtChZ9enYZmZ';
  const api = new RippleAPI();
  const toAddress = 'rLME1vdZEUN8DyWVHkPV2kEvRRevyq9vqj';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XrplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should work', async () => {
    const keypair = api.deriveKeypair(secret);
    const { encoded, txJSON } = await service.createUnsignedTransaction(
      address,
      toAddress,
      '202',
      keypair.publicKey
    );

    // Will be done in the enclave when deployed
    const sig = sign(encoded, keypair.privateKey);

    const res = await service.submitTransaction(txJSON, sig);
    console.log(res);
  });
});
