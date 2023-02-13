import { HttpHeaders } from '@angular/common/http';

export const environment = {
  production: false,
  API_URL: 'http://localhost:3333/api',
  HTTP_OPTIONS: {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  },
};
