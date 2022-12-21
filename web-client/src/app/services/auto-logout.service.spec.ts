import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AutoLogoutService } from './auto-logout.service';

describe('AutoLogoutService', () => {
  let service: AutoLogoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    service = TestBed.inject(AutoLogoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
