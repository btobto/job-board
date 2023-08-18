import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { distinctUntilChanged, filter } from 'rxjs';
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

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}
}
