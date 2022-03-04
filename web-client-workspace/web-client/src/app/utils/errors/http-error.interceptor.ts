import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { SwalHelper } from '../notification/swal-helper';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private notification: SwalHelper) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error from error interceptor', error);

        this.notification.swal.fire({
          icon: 'error',
          text: 'Unexpected Error Occurred',
        });
        return throwError(error);
      }),
      finalize(() => {})
    ) as Observable<HttpEvent<any>>;
  }
}
