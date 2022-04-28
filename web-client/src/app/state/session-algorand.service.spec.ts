import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SessionAlgorandService } from './session-algorand.service';
import { SessionStore } from './session.store';

describe('SessionAlgorandService', () => {
  let sessionAlgorandService: SessionAlgorandService;
  let sessionStore: SessionStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SessionAlgorandService, SessionStore],
    });

    sessionAlgorandService = TestBed.inject(SessionAlgorandService);
    sessionStore = TestBed.inject(SessionStore);
  });

  it('should be created', () => {
    expect(sessionAlgorandService).toBeDefined();
  });
});
