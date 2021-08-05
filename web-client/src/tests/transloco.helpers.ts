import {
  TranslocoTestingModule,
  TranslocoTestingOptions,
} from '@ngneat/transloco';
import * as en from '../assets/i18n/en.json';
import * as fr from '../assets/i18n/fr.json';

/**
 * Docs: {@link https://ngneat.github.io/transloco/docs/unit-testing/}
 *
 * This should match the config in {@link TranslocoRootModule}.
 */
export const getTranslocoTestingModule = (
  options: TranslocoTestingOptions = {}
) =>
  TranslocoTestingModule.forRoot({
    langs: { en, fr },
    translocoConfig: {
      availableLangs: ['en', 'fr'],
      defaultLang: 'en',
      fallbackLang: 'en',
    },
    preloadLangs: true,
    ...options,
  });
