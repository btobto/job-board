import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, filter, map, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { fromAuth } from '../state/auth';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.select(fromAuth.selectUser).pipe(
      tap((user) => {
        if (user && user.accessToken) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          });
        }
      }),
      switchMap(() => next.handle(request))
    );
  }
}
