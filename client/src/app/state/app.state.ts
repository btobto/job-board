import { AuthState } from './auth/auth.reducer';
import { PersonState } from './person/person.reducer';

export interface AppState {
  auth: AuthState;
  person: PersonState;
}
