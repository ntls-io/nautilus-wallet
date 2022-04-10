import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SessionService } from './session.service';
import { SessionStore } from './session.store';

describe('SessionService', () => {
  let sessionService: SessionService;
  let sessionStore: SessionStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionService, SessionStore],
      imports: [HttpClientTestingModule],
    });

    sessionService = TestBed.inject(SessionService);
    sessionStore = TestBed.inject(SessionStore);
  });

  it('should be created', () => {
    expect(sessionService).toBeDefined();
  });
});
