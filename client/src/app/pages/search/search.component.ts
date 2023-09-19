import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, fromEvent, map, of, startWith, switchMap } from 'rxjs';
import { PostingPopulated } from 'src/app/models/posting/posting-populated.model';
import { filterNull, inputValueObservable, searchPipe } from 'src/app/shared/helpers';
import { AppState } from 'src/app/state/app.state';
import { companiesActions, fromCompanies } from 'src/app/state/companies';
import { fromPersons, personsActions } from 'src/app/state/persons';
import { fromPostings, postingsActions } from 'src/app/state/postings';

interface Category {
  name: string;
  textLabel: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  categories: Category[] = [
    { name: 'People', textLabel: 'Name' },
    { name: 'Companies', textLabel: 'Name' },
    { name: 'Postings', textLabel: 'Position' },
  ];
  selectedCategory!: Category;

  personsResults$ = this.store.select(fromPersons.selectAllPersons);
  companiesResults$ = this.store.select(fromCompanies.selectAllCompanies);
  postingsResults$ = this.store.select(fromPostings.selectAllPostings) as Observable<PostingPopulated[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.selectedCategory = this.categories[0];
    this.resetStates();
  }

  ngOnDestroy(): void {
    this.store.dispatch(postingsActions.resetState());
  }

  resetStates() {
    this.store.dispatch(personsActions.resetState());
    this.store.dispatch(companiesActions.resetState());
    this.store.dispatch(postingsActions.resetState());
  }
}
