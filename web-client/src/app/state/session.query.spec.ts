import { SessionQuery } from './session.query';
import { SessionStore } from './session.store';

describe('SessionQuery', () => {
  let query: SessionQuery;

  beforeEach(() => {
    query = new SessionQuery(new SessionStore());
  });

  it('should create an instance', () => {
    expect(query).toBeTruthy();
  });
});
