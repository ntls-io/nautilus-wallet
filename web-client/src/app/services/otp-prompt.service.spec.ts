import { TestBed } from '@angular/core/testing';

import { OtpPromptService } from './otp-prompt.service';

describe('OtpPromptService', () => {
  let service: OtpPromptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtpPromptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
