/**
 * Helpers for defining Storybook stories.
 */

import { NgModule, Provider } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import {
  Viewport,
  ViewportMap,
} from '@storybook/addon-viewport/dist/ts3.9/models';
import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
} from '@storybook/angular';
import { of } from 'rxjs';
import { SessionState, SessionStore } from 'src/app/state/session.store';

/**
 * Story metadata definition helper for Angular / Ionic.
 *
 * This function makes it more ergonomic to declare stories with good defaults
 * for Angular / Ionic components.
 *
 * Type parameters:
 *
 * - `TArgs` (optional) – This should be the story's component (or `Arg`) type,
 *   for better type inference.
 */
export const ionicStoryMeta = <TArgs>(
  meta: Meta<TArgs>,
  extra?: MetaExtra<TArgs>
): Meta<TArgs> => ({
  ...meta,
  // Augment parameters
  parameters: {
    layout: 'fullscreen',
    ...meta.parameters,
    // Augment parameters.controls
    controls: {
      ...meta.parameters?.controls,
      // An empty include list is meaningful: only produce one if defined.
      ...(extra?.controls?.shown === undefined &&
      meta.parameters?.controls?.include === undefined
        ? {}
        : {
            include: [
              ...(extra?.controls?.shown ?? []),
              ...(meta.parameters?.controls?.include ?? []),
            ],
          }),
      exclude: [
        ...DEFAULT_EXCLUDE_CONTROLS,
        ...(extra?.controls?.hidden ?? []),
        ...(meta.parameters?.controls?.exclude ?? []),
      ],
    },
  },
  // Augment argTypes
  argTypes: {
    ...meta.argTypes,
    // Augment each arg field listed as an output control.
    ...Object.fromEntries(
      (extra?.controls?.outputs ?? []).map((key) => [
        key,
        {
          ...meta?.argTypes?.[key],
          control: {
            type: null,
            ...meta?.argTypes?.[key]?.control,
          },
        },
      ])
    ),
  },

  // Augment decorators
  decorators: [
    moduleMetadata<TArgs>({
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule, // TODO: Replace with <https://storybook.js.org/addons/storybook-addon-angular-router>?
        ...(extra?.imports ?? []),
      ],
    }),
    componentWrapperDecorator<TArgs>(
      // prettier-ignore
      extra?.layoutType === 'page' ? ionAppPageWrapper :
        extra?.layoutType === 'component' ? ionAppComponentWrapper :
        ionAppComponentWrapper
    ),
    ...(meta?.decorators ?? []),
  ],
});

/**
 * Extra application-specific configuration for {@link ionicStoryMeta}.
 */
export type MetaExtra<TArgs> = {
  /**
   * Additional Angular modules to import using {@link moduleMetadata}.
   */
  imports?: NgModule['imports'];

  /**
   * Shorthand configuration of controls.
   */
  controls?: {
    /**
     * Show (include) only the named controls.
     */
    shown?: Array<keyof TArgs>;

    /**
     * Hide (exclude) the named controls.
     */
    hidden?: Array<Exclude<keyof TArgs, DefaultExcludeControls>>;

    /**
     * Treat as outputs: don't exclude them (so that actions work),
     * but don't make them editable.
     */
    outputs?: Array<Exclude<keyof TArgs, DefaultExcludeControls>>;
  };

  /**
   * Which layout wrapping to use:
   *
   * - `component` (default) – Suitable for general Ionic components.
   *   Wrap the component in `ion-app`, `ion-content`, and a fixed `ion-grid`.
   *
   * - `page` – Ionic page components, assumed to contain `ion-content`.
   *   Wrap the component in `ion-app` only.
   */
  layoutType?: 'component' | 'page';
};

export type DefaultExcludeControls =
  | 'ionViewDidEnter'
  | 'ngOnDestroy'
  | 'ngOnInit';

export const DEFAULT_EXCLUDE_CONTROLS: Array<DefaultExcludeControls> = [
  'ionViewDidEnter',
  'ngOnDestroy',
  'ngOnInit',
];

/** @see MetaExtra.layoutType */
const ionAppComponentWrapper = (story: string): string =>
  ionAppPageWrapper(`
    <ion-content>
      ${story}
    </ion-content>
  `);

/** @see MetaExtra.layoutType */
const ionAppPageWrapper = (story: string): string =>
  `
    <ion-app>
      ${story}
    </ion-app>
  `;

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
