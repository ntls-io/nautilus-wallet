import { Pipe, PipeTransform } from '@angular/core';
import { SessionQuery } from '../state/session.query';

@Pipe({
  name: 'isMe',
})
export class IsMePipe implements PipeTransform {
  constructor(private sessionQuery: SessionQuery) {}

  transform(address: string | undefined): boolean {
    const me = this.sessionQuery.getValue().wallet?.wallet_id;
    return address === me;
  }
}
