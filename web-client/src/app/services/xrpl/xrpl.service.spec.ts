import { TestBed } from '@angular/core/testing';
import { RippleAPI } from 'ripple-lib';
import { XrplService } from './xrpl.service';
import { sign } from 'ripple-keypairs';

describe('XrplService', () => {
  let service: XrplService;
  let address = 'r4442Uyod51PqEkYh2EwxViBmcVw9kuPE9';
  let secret = 'shLaVojVmVwbXtBCpmtChZ9enYZmZ';
  let api = new RippleAPI();
  let toAddress = 'rLME1vdZEUN8DyWVHkPV2kEvRRevyq9vqj';

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

    const sig = signTransactionBytes(encoded, keypair.privateKey);

    const res = await service.submitTransaction(txJSON, sig);
    console.log(res);
  });
});

const signTransactionBytes = (encodedTx: string, privateKey: any) => {
  return sign(encodedTx, privateKey);
};
