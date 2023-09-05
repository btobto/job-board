import { AuthState } from './auth/auth.reducer';
import { PersonState } from './person/person.reducer';
import { UserState } from './user/user.reducer';

export interface AppState {
  auth: AuthState;
  user: UserState;
  person: PersonState;
}
