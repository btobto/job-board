import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpContextToken,
  HttpContext,
} from '@angular/common/http';
import { Observable, filter, map } from 'rxjs';
import { Posting } from '../models';
import { environment } from 'src/environments/environment';

const EXCLUDE_PATH = new HttpContextToken(() => false);

export function excludeFromPostingInterceptor() {
  return new HttpContext().set(EXCLUDE_PATH, true);
}

@Injectable()
export class PostingInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      filter((event: HttpEvent<any>): event is HttpResponse<any> => event instanceof HttpResponse),
      map((event) => {
        if (this.isValidUrl(request)) {
          if (Array.isArray(event.body)) {
            event.body.forEach((posting) => this.transformPosting(posting));
          } else if (event.body) {
            this.transformPosting(event.body);
          }
        }

        return event;
      })
    );
  }

  isValidUrl(request: HttpRequest<unknown>): boolean {
    return request.url.startsWith(`${environment.apiUrl}/postings`) && !request.context.get(EXCLUDE_PATH);
  }

  transformPosting(posting: Posting) {
    posting.datePosted = new Date(posting.datePosted);
  }
}
