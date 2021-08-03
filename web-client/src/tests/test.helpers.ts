/**
 * Nautilus Wallet test helpers.
 */

import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

/**
 * Verify that the fixture has a button that successfully navigates to the given `routerLink`.
 */
export const verifyNavigationTrigger = async (
  router: Router,
  fixture: ComponentFixture<any>,
  routerLink: string
): Promise<void> => {
  expect(router.url).toBe('/');
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
