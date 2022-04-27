import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SessionXrplService } from './session-xrpl.service';
import { SessionStore } from './session.store';

describe('SessionXrplService', () => {
  let sessionXrplService: SessionXrplService;
  let sessionStore: SessionStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SessionXrplService, SessionStore],
    });

    sessionXrplService = TestBed.inject(SessionXrplService);
    sessionStore = TestBed.inject(SessionStore);
  });

  it('should be created', () => {
    expect(sessionXrplService).toBeDefined();
  });
});
