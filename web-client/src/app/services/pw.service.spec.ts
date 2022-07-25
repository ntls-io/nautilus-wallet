import { TestBed } from '@angular/core/testing';

import { PwService } from './pw.service';

describe('PwService', () => {
  let service: PwService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PwService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
