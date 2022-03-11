// This file is required by karma.conf.js and loads recursively all the .spec and framework files

// organize-imports-ignore: This must be imported first.
import 'zone.js/dist/zone-testing';

import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

declare const require: {
  context(
    path: string,
    deep?: boolean,
    filter?: RegExp
  ): {
    <T>(id: string): T;
    keys(): string[];
  };
};
// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
  {
    teardown: { destroyAfterEach: false },
  }
);
// Then we find all the tests.
const context = require.context(
  './',
  true,
  // XXX: Work around Angular not reporting coverage for all files.
  //
  // In our case, we want to include everything except for:
  //  * Storybook stories
  //  * `main.ts`, because of platform configuration side effects.
  //    (This avoids "Error: A platform with a different configuration has been created.")
  //
  // See also the include / exclude patterns in `tsconfig.spec.json`.
  //
  // Upstream issue: https://github.com/angular/angular-cli/issues/1735
  /(?<!\/main|\.stories)\.ts$/
);
// And load the modules.
context.keys().map(context);
