import { TestBed } from '@angular/core/testing';
import { XrplService } from './xrpl.service';

// TODO(Pi): See testing notes for AlgodService.
describe('XrplService', () => {
  let service: XrplService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XrplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
