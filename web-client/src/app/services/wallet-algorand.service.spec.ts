import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { WalletAlgorandService } from './wallet-algorand.service';

describe('WalletAlgorandService', () => {
  let service: WalletAlgorandService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(WalletAlgorandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
