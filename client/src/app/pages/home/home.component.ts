import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, filter } from 'rxjs';
import { User } from 'src/app/models';
import { UserType } from 'src/app/shared/enums/user-type.enum';
import { getUserType } from 'src/app/shared/helpers';
import { AppState } from 'src/app/state/app.state';
import { fromAuth } from 'src/app/state/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user$ = this.store.select(fromAuth.selectUser) as Observable<User>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  getUserType(user: User): UserType {
    return getUserType(user);
  }
}
