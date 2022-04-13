/**
 * Helpers for defining Storybook stories.
 */

import { Provider } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  Viewport,
  ViewportMap,
} from '@storybook/addon-viewport/dist/ts3.9/models';
import { of } from 'rxjs';
import { SessionState, SessionStore } from 'src/app/state/session.store';

// Docs: https://ionicframework.com/docs/layout/grid#grid-size
// Defaults: https://github.com/storybookjs/storybook/blob/master/addons/viewport/src/defaults.ts
export const IONIC_VIEWPORTS: ViewportMap = Object.fromEntries(
  (
    [
      ['xs', 360, 9 / 16, 'mobile'],
      ['sm', 576, 2 / 3, 'mobile'],
      ['md', 768, 3 / 4, 'tablet'],
      ['lg', 992, 4 / 3, 'lg'],
      ['xl', 1200, 16 / 9, 'desktop'],
    ] as Array<[string, number, number, Viewport['type']]>
  ).map(([name, width, aspect, type]): [string, Viewport] => [
    `ionic-${name}`,
    {
      name: `Ionic ${name}`,
      styles: {
        width: `${width}px`,
        height: ((height) => `${height}px`)(width / aspect),
      },
      type,
    },
  ])
);

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
