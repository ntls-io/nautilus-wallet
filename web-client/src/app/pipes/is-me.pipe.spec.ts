import { TestBed } from '@angular/core/testing';
import { SessionQuery } from '../state/session.query';
import { IsMePipe } from './is-me.pipe';

describe('IsMePipe', () => {
  it('create an instance', () => {
    const sessionQuery: SessionQuery = TestBed.get(SessionQuery);
    const pipe = new IsMePipe(sessionQuery);
    expect(pipe).toBeTruthy();
  });
});
