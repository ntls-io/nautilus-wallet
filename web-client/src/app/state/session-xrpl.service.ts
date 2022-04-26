import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionXrplStore } from './session-xrpl.store';

@Injectable({ providedIn: 'root' })
export class SessionXrplService {
  constructor(
    private sessionXrplStore: SessionXrplStore,
    private http: HttpClient
  ) {}
}
