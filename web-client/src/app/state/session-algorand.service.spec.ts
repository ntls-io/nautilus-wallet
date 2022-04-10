import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SessionAlgorandService } from './session-algorand.service';
import { SessionStore } from './session.store';

describe('SessionAlgorandService', () => {
  let sessionAlgorandService: SessionAlgorandService;
  let sessionAlgorandStore: SessionStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionAlgorandService, SessionStore],
      imports: [HttpClientTestingModule],
    });

    sessionAlgorandService = TestBed.inject(SessionAlgorandService);
    sessionAlgorandStore = TestBed.inject(SessionStore);
  });

  it('should be created', () => {
    expect(sessionAlgorandService).toBeDefined();
  });
});
