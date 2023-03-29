import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { UserBase } from '../models/user-base.interface';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  currentUser: UserBase | null = null;

  constructor(private authService: AuthService) {
    authService.loggedInUser$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.currentUser && this.currentUser.accessToken) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.currentUser.accessToken}`,
        },
      });
    }

    return next.handle(req);
  }
}
