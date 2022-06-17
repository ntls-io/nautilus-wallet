import { TestBed } from '@angular/core/testing';

import { NfcHandlerService } from './nfc-handler.service';

describe('NfcHandlerService', () => {
  let service: NfcHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NfcHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
