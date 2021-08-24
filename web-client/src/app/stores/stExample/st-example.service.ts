import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StExampleStore } from './st-example.store';

@Injectable({ providedIn: 'root' })
export class StExampleService {
  constructor(
    private stExampleStore: StExampleStore,
    private http: HttpClient
  ) {}
}
