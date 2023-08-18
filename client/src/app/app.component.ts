import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';
import { authActions, fromAuth } from './state/auth';
import { Message, MessageService } from 'primeng/api';
import { filter, tap } from 'rxjs';
import { HttpErrorBody } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Job Board - Bozidar Tosic 18016';

  error$ = this.store.select(fromAuth.selectError);

  constructor(
    private store: Store<AppState>,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.error$.pipe(filter((e) => !!e)).subscribe((error: HttpErrorBody) =>
      this.messageService.add({
        key: 'globalToast',
        severity: 'error',
        summary: 'Error: ' + error.error,
        detail: error.message,
      })
    );

    this.store.dispatch(authActions.autoLogin());
  }
}
