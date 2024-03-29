import { AuthState } from './auth/auth.reducer';
import { CompaniesState } from './companies/companies.reducer';
import { PaginationState } from './pagination/pagination.reducer';
import { PersonsState } from './persons/persons.reducer';
import { PostingsState } from './postings/postings.reducer';
import { ReviewsState } from './reviews/reviews.reducer';
import { UserState } from './user/user.reducer';

export interface AppState {
  auth: AuthState;
  user: UserState;
  persons: PersonsState;
  companies: CompaniesState;
  postings: PostingsState;
  reviews: ReviewsState;
  pagination: PaginationState;
}
