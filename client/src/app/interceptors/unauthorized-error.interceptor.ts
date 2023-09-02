import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { authActions } from '../state/auth';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class UnauthorizedErrorInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>, private notificationService: NotificationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          console.log('Unauthorized logging out');
          this.store.dispatch(authActions.logout());
          this.notificationService.showError('Logging in error.', 'Please login again.');
        }
        return throwError(() => new Error(error.error?.message || error.statusText));
      })
    );
  }
}
