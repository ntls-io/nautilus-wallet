import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';
import { DeleteUserService } from './delete-user.service';

describe('DeleteUserService', () => {
  let service: DeleteUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    service = TestBed.inject(DeleteUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
