import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, exhaustMap, filter, map, switchMap, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { fromAuth } from '../state/auth';
import { User } from '../models';
import { fromUser } from '../state/user';
import { LocalStorageJwtService } from '../services/local-storage-jwt.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private localStorageJwtService: LocalStorageJwtService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.localStorageJwtService.getToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request);
  }
}
