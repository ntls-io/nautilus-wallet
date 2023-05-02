import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

// Difference between Unix Epoch and Ripple Epoch
const RIPPLE_EPOCH = 946684800; // seconds

@Pipe({
  name: 'xrpDate',
})
export class XrpDatePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform(date: number): string {
    if (date) {
      const rippleEpoch = new Date('01/01/2000 00:00:00');
      rippleEpoch.setTime(rippleEpoch.getTime() + date * 1000);
      const offsetMilliSeconds = rippleEpoch.getTimezoneOffset() * 60 * 1000;
      const localTime = this.datePipe.transform(
        rippleEpoch.getTime() - offsetMilliSeconds,
        'yyyy-MM-dd HH:mm:ss'
      );
      return localTime || '';
    }
    return '';
  }
}
