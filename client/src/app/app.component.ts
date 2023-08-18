import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';
import { authActions } from './state/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Job Board - Bozidar Tosic 18016';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(authActions.autoLogin());
  }
}
