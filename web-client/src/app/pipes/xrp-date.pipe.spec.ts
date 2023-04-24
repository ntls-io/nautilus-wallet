import { DatePipe } from '@angular/common';
import { XrpDatePipe } from './xrp-date.pipe';

describe('XrpDatePipe', () => {
  let pipe: XrpDatePipe;

  beforeEach(() => {
    pipe = new XrpDatePipe(new DatePipe('en-US'));
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
