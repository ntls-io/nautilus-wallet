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
export const verifyButtonNavigation = async (
  router: Router,
  fixture: ComponentFixture<any>,
  routerLink: string
): Promise<void> => {
  expect(router.url).toBe('/');
  const button = getButtonWithLink(fixture.debugElement, routerLink);
  button.nativeElement.click();
  await fixture.whenStable();
  expect(router.url).toBe(routerLink);
};

const getButtonWithLink = (
  element: DebugElement,
  routerLink: string
): DebugElement => {
  const button = element.query(
    By.css(`ion-button[routerLink="${routerLink}"]`)
  );
  expect(button).not.toBeNull();
  return button;
};
