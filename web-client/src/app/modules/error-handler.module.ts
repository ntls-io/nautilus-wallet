import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import * as SentryAngular from '@sentry/angular';
import * as Sentry from '@sentry/capacitor';
import { Integrations as TracingIntegrations } from '@sentry/tracing';
import { GlobalErrorHandler } from '../utils/errors/global-error-handler';
import { HttpErrorInterceptor } from '../utils/errors/http-error.interceptor';

Sentry.init(
  {
    dsn: 'https://67b1d83771ef47bfb176012e478f8a6f@o1082240.ingest.sentry.io/6090433',
    integrations: [new TracingIntegrations.BrowserTracing()],
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
})
export class ErrorHandlerModule {}
