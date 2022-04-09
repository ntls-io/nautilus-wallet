import { TestBed } from '@angular/core/testing';
import { AlgodService } from './algod.service';

describe('AlgodService', () => {
  let service: AlgodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlgodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
