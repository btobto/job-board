import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, filter } from 'rxjs';
import { Person, User } from 'src/app/models';
import { isNotNull } from 'src/app/shared/helpers';
import { AppState } from 'src/app/state/app.state';
import { fromAuth } from 'src/app/state/auth';
import { fromPerson, personActions } from 'src/app/state/person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent implements OnInit {
  loggedInUser$: Observable<User> = this.store.select(fromAuth.selectUser).pipe(filter(isNotNull)); // as User ?
  selectedPerson$: Observable<Person> = this.store.select(fromPerson.selectSelectedPerson).pipe(filter(isNotNull));

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.store.dispatch(personActions.loadPerson({ personId: this.route.snapshot.params['id'] }));
  }

  ngOnInit(): void {}

  getPersonPosition(person: Person): string {
    return 'CEO of Testosterone';
  }
}
