import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'xrpDate',
})
export class XrpDatePipe implements PipeTransform {
  transform(date: number | undefined): string {
    if (date) {
      const from = new Date('01/01/2000');
      const finalDate = new Date(from.setSeconds(from.getSeconds() + date));
      return new Date(finalDate).toLocaleString();
    }
    return '';
  }
}
