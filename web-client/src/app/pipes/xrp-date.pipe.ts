import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'xrpDate',
})
export class XrpDatePipe implements PipeTransform {
  transform(date: number | undefined): string {
    if (date) {
      const from = moment.utc('01/01/2000', 'DD/MM/YYYY');
      const finalDate = moment(from).add(date, 'seconds');
      return finalDate.local().format('YYYY-MM-DD HH:mm:ss');
    }
    return '';
  }
}
