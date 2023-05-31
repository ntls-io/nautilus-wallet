import { CommonModule } from '@angular/common';
import { ErrorHandler, NgModule } from '@angular/core';
import * as SentryAngular from '@sentry/angular';
import * as Sentry from '@sentry/capacitor';
import { Dedupe as DedupeIntegration } from '@sentry/integrations';
import { BrowserTracing } from '@sentry/tracing';
import { GlobalErrorHandler } from '../utils/errors/global-error-handler';

Sentry.init(
  {
    dsn: 'https://67b1d83771ef47bfb176012e478f8a6f@o1082240.ingest.sentry.io/6090433',
    integrations: [new DedupeIntegration(), new BrowserTracing()],
  },
  SentryAngular.init
);

@NgModule({
  declarations: [],
  imports: [CommonModule],

  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
  ],
})
export class ErrorHandlerModule {}
