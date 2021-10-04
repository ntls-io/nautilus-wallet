/**
 * Helpers for defining Storybook stories.
 */

import { Provider } from '@angular/core';
import {
  SessionState,
  SessionStore,
} from 'src/app/stores/session/session.store';

/**
 * Define a `SessionStore` provider initialised with the given session state.
 */
export const provideSessionStore = (state: SessionState): Provider => ({
  provide: SessionStore,
  useValue: newSessionStore(state),
});

/**
 * Construct a `SessionStore` with the given session state.
 */
const newSessionStore = (state: Partial<SessionState>): SessionStore => {
  const store = new SessionStore();
  store.update(state);
  return store;
};
