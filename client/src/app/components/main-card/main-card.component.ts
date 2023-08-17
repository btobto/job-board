import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { filter } from 'rxjs';
import { HttpErrorBody } from 'src/app/models';
import { AppState } from 'src/app/state/app.state';
import { fromAuth } from 'src/app/state/auth';

@Component({
  selector: 'app-main-card',
  templateUrl: './main-card.component.html',
  styleUrls: ['./main-card.component.scss'],
})
export class MainCardComponent implements OnInit {
  loading$ = this.store.select(fromAuth.selectLoading);
  error$ = this.store.select(fromAuth.selectError);

  constructor(
    private store: Store<AppState>,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.error$.pipe(filter((e) => !!e)).subscribe((error: HttpErrorBody) =>
      this.messageService.add({
        severity: 'error',
        summary: 'Error: ' + error.error,
        detail: error.message,
      })
    );
  }
}
