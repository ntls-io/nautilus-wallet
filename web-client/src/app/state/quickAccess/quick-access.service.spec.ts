import { TestBed } from '@angular/core/testing';

import { QuickAccessService } from './quick-access.service';

describe('QuickAccessService', () => {
  let service: QuickAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuickAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
