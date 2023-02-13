import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private readonly router: Router) {}

  canActivate(): Observable<boolean> {
    const user = window.localStorage.getItem('user');

    if (user == null) {
      this.router.navigate(['/login']);
      return of(false);
    }

    return of(true);
  }
}
