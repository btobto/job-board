import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';
import { authActions, fromAuth } from './state/auth';
import { Message, MessageService } from 'primeng/api';
import { filter, tap } from 'rxjs';
import { HttpErrorBody } from './models';
import { GLOBAL_MSG_SERVICE_KEY } from './services/notification.service';
import { LocalStorageJwtService } from './services/local-storage-jwt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Job Board - Bozidar Tosic 18016';

  constructor(
    private store: Store<AppState>,
    private localStorageJwtService: LocalStorageJwtService,
    @Inject(GLOBAL_MSG_SERVICE_KEY) public msgServiceKey: string
  ) {}

  ngOnInit(): void {
    if (this.localStorageJwtService.getToken()) this.store.dispatch(authActions.autoLogin());
  }
}
