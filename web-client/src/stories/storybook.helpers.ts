/**
 * Helpers for defining Storybook stories.
 */

import { Provider } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { of } from 'rxjs';
import {
  SessionState,
  SessionStore,
} from 'src/app/stores/session/session.store';

/**
 * Define a `ActivatedRoute` provider initialised with the given `queryParams`.
 *
 * FIXME(Pi): This doesn't currently respond properly to story args changes,
 *            crashing somewhere in the subscription machinery instead,
 *            but I'm not sure why.
 */
export const provideActivatedRouteQueryParams = (
  queryParams: Params
): Provider => ({
  provide: ActivatedRoute,
  useValue: {
    queryParams: of(queryParams),
  } as ActivatedRoute,
});

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
