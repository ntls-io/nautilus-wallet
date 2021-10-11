/**
 * Nautilus Wallet test helpers.
 */

import { DebugElement, EventEmitter } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flushMicrotasks,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

export type Constructor<T> = new (...args: any[]) => T;

/**
 * Helper: Check that o is an instance of the given class.
 */
export const checkClass = <T>(o: unknown, cls: Constructor<T>): T => {
  if (o instanceof cls) {
    return o;
  } else {
    const oClsName = (o as any)?.constructor?.name;
    throw new TypeError(`expected ${cls.name}, got ${oClsName}: ${o}`);
  }
};

/**
 * Collect and return the events emitted while executing `f`.
 */
export const eventsEmitted = <T>(emitter: EventEmitter<T>, f: () => void) => {
  const emitted: Array<T> = [];
  const subscription = emitter.subscribe((value) => emitted.push(value));
  try {
    f();
  } finally {
    subscription.unsubscribe();
  }
  return emitted;
};

/**
 * Retrieve a test component DOM element.
 */
export const componentElement = <T extends Element>(
  fixture: ComponentFixture<unknown>,
  selectors: string
): HTMLElement => {
  const root = checkClass(fixture.nativeElement, HTMLElement);
  const element = root.querySelector(selectors);
  return checkClass(element, HTMLElement);
};

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
 * Assert that `f` shows the given toast message.
 */
export const assertShowsToast = async (
  toastController: ToastController,
  toastOptions: Parameters<typeof ToastController.prototype.create>[0],
  f: () => Promise<void>
): Promise<void> => {
  const toastSpy = jasmine.createSpyObj<HTMLIonToastElement>(
    'HTMLIonToastElement',
    { present: Promise.resolve() }
  );
  const createSpy = spyOn(toastController, 'create').and.resolveTo(toastSpy);
  await f();
  expect(createSpy).toHaveBeenCalledOnceWith(toastOptions);
  expect(toastSpy.present).toHaveBeenCalledOnceWith();
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
