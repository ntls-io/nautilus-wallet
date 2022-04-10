import { SessionStore } from './session.store';

describe('SessionStore', () => {
  let store: SessionStore;

  beforeEach(() => {
    store = new SessionStore();
  });

  it('should create an instance', () => {
    expect(store).toBeTruthy();
  });
});
