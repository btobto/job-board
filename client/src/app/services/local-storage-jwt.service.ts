import { Injectable } from '@angular/core';
import { UserType } from '../shared/enums/user-type.enum';
import { JwtTokenPayload } from '../models';

const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageJwtService {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  setToken(data: string) {
    localStorage.setItem(TOKEN_KEY, data);
  }

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  }
}
