import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, exhaustMap, filter, map, switchMap, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { fromAuth } from '../state/auth';
import { LocalStorageJwtService } from '../services/local-storage-jwt.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private localStorageJwtService: LocalStorageJwtService, private store: Store<AppState>) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.select(fromAuth.selectToken).pipe(
      take(1),
      map((token) => {
        if (token) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
        return request;
      }),
      switchMap(next.handle)
    );
  }
}
