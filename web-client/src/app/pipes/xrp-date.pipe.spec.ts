import { DatePipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { XrpDatePipe } from './xrp-date.pipe';

describe('XrpDatePipe', () => {
  let pipe: XrpDatePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatePipe],
    });

    pipe = TestBed.inject(XrpDatePipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
