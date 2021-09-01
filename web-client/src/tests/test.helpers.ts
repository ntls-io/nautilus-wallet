/**
 * Nautilus Wallet test helpers.
 */

import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flushMicrotasks,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

/**
 * Verify that the fixture has a button that successfully navigates to the given `routerLink`.
 */
export const verifyNavigationTrigger = async (
  router: Router,
  fixture: ComponentFixture<any>,
  urlBeforeClick: string,
  routerLink: string
): Promise<void> => {
  expect(router.url).toBe(urlBeforeClick);
  const trigger = getElementWithLink(fixture.debugElement, routerLink);
  trigger.nativeElement.click();
  await fixture.whenStable();
  expect(router.url).toBe(routerLink);
};

const getElementWithLink = (
  element: DebugElement,
  routerLink: string
): DebugElement => {
  const trigger =
    element.query(By.css(`ion-button[routerLink="${routerLink}"]`)) ??
    element.query(By.css(`ion-item[ng-reflect-router-link="${routerLink}"]`));

  expect(trigger).not.toBeNull();
  return trigger;
};

/**
 * Resolve a promise with dynamic context provided by a callable.
 *
 * This is intended to make it slightly less awkward to use Promise-based code with Angular's HTTP testing pattern,
 * which requires request expectations to be made strictly _after_ the code under test makes its requests,
 * but _before_ awaiting completion of the code under test.
 *
 * With this helper, `const result = await codeUnderTest()` becomes:
 *
 * ```
 * const result = await withResolveContext(codeUnderTest(), () => {
 *   // Use httpTestingController.expectOne(…)
 * })
 * ```
 *
 * @see https://angular.io/guide/http#testing-http-requests
 *
 * @param promise Promise to await
 * @param context callable to invoke before awaiting `promise`
 */
export const withResolveContext = async <T>(
  promise: Promise<T>,
  context: () => void
): Promise<T> => {
  context();
  return await promise;
};

/**
 * Like {@link withResolveContext}, but support a series of nested dynamic contexts.
 *
 * This can be used when a promised depends on more thane
 *
 * The implementation of this function more tricky and subtle:
 * it relies on careful use of Angular's {@link fakeAsync} and {@link flushMicrotasks}
 * to manually advance the resolving task's execution before calling each context.
 *
 * @param promise Promise to return
 * @param contexts A series of context callables to be called in order,
 *                 interleaved with advancing the execution of `promise`
 */
export const withNestedResolveContexts = <R>(
  promise: Promise<R>,
  contexts: Array<() => void>
): Promise<R> =>
  fakeAsync(() => {
    for (const context of contexts) {
      flushMicrotasks();
      context();
    }
    return promise;
  })();
