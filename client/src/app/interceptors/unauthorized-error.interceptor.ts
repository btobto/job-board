import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, filter, of, switchMap, tap, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { authActions, fromAuth } from '../state/auth';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class UnauthorizedErrorInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>, private notificationService: NotificationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.select(fromAuth.selectIsLoggedIn).pipe(
      switchMap((isLoggedIn) =>
        next.handle(request).pipe(
          catchError((error) => {
            if (isLoggedIn && error instanceof HttpErrorResponse && error.status === 401) {
              console.log('Unauthorized logging out');
              this.store.dispatch(authActions.logout());
              this.notificationService.showMessage('error', 'Logging in error.', 'Please log in again.');
            }
            return throwError(() => new Error(error.error?.message || error.statusText));
          })
        )
      )
    );
  }
}
