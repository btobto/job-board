import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { PostingSearchQuery } from 'src/app/models';
import { COUNTRY_LIST } from 'src/app/shared/constants';
import { searchPipe } from 'src/app/shared/helpers';
import { AppState } from 'src/app/state/app.state';
import { postingsActions } from 'src/app/state/postings';

@UntilDestroy()
@Component({
  selector: 'app-postings-search-filters',
  templateUrl: './postings-search-filters.component.html',
  styleUrls: ['./postings-search-filters.component.scss'],
})
export class PostingsSearchFiltersComponent implements AfterViewInit {
  countries: string[] = COUNTRY_LIST;

  filterForm = this.fb.group({
    position: [''],
    location: this.fb.group({
      country: [''],
      city: [''],
    }),
    remoteAvailable: [false],
    requirements: this.fb.control<string[]>([]),
  });

  constructor(private store: Store<AppState>, private fb: NonNullableFormBuilder) {}

  ngAfterViewInit(): void {
    this.filterForm.valueChanges.pipe(searchPipe(), untilDestroyed(this)).subscribe((query: PostingSearchQuery) => {
      console.log('posting', query);
      this.store.dispatch(postingsActions.searchPostings({ query }));
    });
  }
}
