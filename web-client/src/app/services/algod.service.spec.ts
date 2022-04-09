import { TestBed } from '@angular/core/testing';
import { AlgodService } from './algod.service';

// TODO(Pi): This needs a testing strategy, but it's not trivial to instantiate an Algorand sandbox here.
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
