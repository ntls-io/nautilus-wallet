import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transactionFee',
})
export class TransactionFeePipe implements PipeTransform {
  transform(
    amount: number = 0,
    percentage: number = 0,
    isTotal?: boolean
  ): number {
    const fee = Number(((amount * percentage) / 100).toFixed(2));
    if (isNaN(amount)) {
      return 0;
    }
    return isTotal ? amount - fee : fee;
  }
}
