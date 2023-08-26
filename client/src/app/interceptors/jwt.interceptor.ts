import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, exhaustMap, filter, map, switchMap, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { fromAuth } from '../state/auth';
import { User } from '../models';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.select(fromAuth.selectUser).pipe(
      take(1),
      map((user) => {
        if (user && user.accessToken) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          });
        }
        return request;
      }),
      switchMap(next.handle)
    );
  }
}
