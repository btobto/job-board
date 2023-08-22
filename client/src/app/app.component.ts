import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';
import { authActions, fromAuth } from './state/auth';
import { Message, MessageService } from 'primeng/api';
import { filter, tap } from 'rxjs';
import { HttpErrorBody } from './models';
import { GLOBAL_MSG_SERVICE_KEY } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Job Board - Bozidar Tosic 18016';

  error$ = this.store.select(fromAuth.selectError);

  constructor(private store: Store<AppState>, @Inject(GLOBAL_MSG_SERVICE_KEY) public msgServiceKey: string) {}

  ngOnInit(): void {
    this.store.dispatch(authActions.autoLogin());
    // this.error$
    //   .pipe(
    //     filter((e) => !!e),
    //     tap((e) => console.log(e))
    //   )
    //   .subscribe((error: HttpErrorBody) =>
    //     this.messageService.add({
    //       key: 'globalToast',
    //       severity: 'error',
    //       summary: 'Error: ' + error.error,
    //       detail: error.message,
    //     })
    //   );
  }
}
