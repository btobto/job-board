import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { PostingSearchQuery } from 'src/app/models';
import { COUNTRY_LIST } from 'src/app/shared/constants';
import { searchPipe } from 'src/app/shared/helpers';
import { AppState } from 'src/app/state/app.state';
import { postingsActions } from 'src/app/state/postings';

@Component({
  selector: 'app-postings-search-filters',
  templateUrl: './postings-search-filters.component.html',
  styleUrls: ['./postings-search-filters.component.scss'],
})
export class PostingsSearchFiltersComponent implements AfterViewInit, OnDestroy {
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

  valueSub!: Subscription;

  constructor(private store: Store<AppState>, private fb: NonNullableFormBuilder) {}

  ngAfterViewInit(): void {
    this.valueSub = this.filterForm.valueChanges.pipe(searchPipe()).subscribe((query: PostingSearchQuery) => {
      console.log('posting', query);
      this.store.dispatch(postingsActions.searchPostings({ query }));
    });
  }

  ngOnDestroy(): void {
    this.valueSub.unsubscribe();
  }
}
