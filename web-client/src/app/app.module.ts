import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import * as SentryAngular from '@sentry/angular';
import * as Sentry from '@sentry/capacitor';
import { Integrations as TracingIntegrations } from '@sentry/tracing';
import { NgxPrinterModule } from 'ngx-printer';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorHandlerModule } from './modules/error-handler.module';
import { TranslocoRootModule } from './transloco/transloco-root.module';

Sentry.init(
  {
    dsn: 'https://67b1d83771ef47bfb176012e478f8a6f@o1082240.ingest.sentry.io/6090433',
    integrations: [new TracingIntegrations.BrowserTracing()],
  },
  SentryAngular.init
);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    TranslocoRootModule,
    FontAwesomeModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    AkitaNgRouterStoreModule,
    NgxPrinterModule.forRoot({ printOpenWindow: false }),
    ErrorHandlerModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: ErrorHandler,
      useValue: SentryAngular.createErrorHandler(),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
