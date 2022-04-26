import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SessionXrplService } from './session-xrpl.service';
import { SessionXrplStore } from './session-xrpl.store';

describe('SessionXrplService', () => {
  let sessionXrplService: SessionXrplService;
  let sessionXrplStore: SessionXrplStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionXrplService, SessionXrplStore],
      imports: [HttpClientTestingModule],
    });

    sessionXrplService = TestBed.inject(SessionXrplService);
    sessionXrplStore = TestBed.inject(SessionXrplStore);
  });

  it('should be created', () => {
    expect(sessionXrplService).toBeDefined();
  });
});
