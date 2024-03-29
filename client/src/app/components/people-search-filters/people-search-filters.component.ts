import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { Subscription, tap } from 'rxjs';
import { PersonSearchQuery } from 'src/app/models';
import { COUNTRY_LIST } from 'src/app/shared/constants';
import { searchPipe } from 'src/app/shared/helpers';
import { AppState } from 'src/app/state/app.state';
import { personsActions } from 'src/app/state/persons';

@UntilDestroy()
@Component({
  selector: 'app-people-search-filters',
  templateUrl: './people-search-filters.component.html',
  styleUrls: ['./people-search-filters.component.scss'],
})
export class PeopleSearchFiltersComponent implements AfterViewInit {
  countries: string[] = COUNTRY_LIST;

  filterForm = this.fb.group({
    name: [''],
    location: this.fb.group({
      country: [''],
      city: [''],
    }),
    skills: this.fb.control<string[]>([]),
  });

  constructor(private store: Store<AppState>, private fb: NonNullableFormBuilder) {}

  ngAfterViewInit(): void {
    this.filterForm.valueChanges
      .pipe(
        // tap(console.log),
        searchPipe(),
        untilDestroyed(this)
      )
      .subscribe((query: PersonSearchQuery) => {
        console.log('dispatched', query);
        this.store.dispatch(personsActions.searchPeople({ query }));
      });
  }
}
