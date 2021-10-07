import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { OnfidoState, OnfidoStore } from './onfido.store';

@Injectable({ providedIn: 'root' })
export class OnfidoQuery extends Query<OnfidoState> {
  constructor(protected store: OnfidoStore) {
    super(store);
  }
}
