import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UiModule } from '@nbp-it-job-board/ui';
import { CompanyComponent } from 'libs/ui/src/lib/pages/company/company.component';
import { HomeComponent } from 'libs/ui/src/lib/pages/home/home.component';
import { LoginComponent } from 'libs/ui/src/lib/pages/login/login.component';
import { PostingComponent } from 'libs/ui/src/lib/pages/posting/posting.component';
import { RegisterComponent } from 'libs/ui/src/lib/pages/register/register.component';
import { SearchComponent } from 'libs/ui/src/lib/pages/search/search.component';
import { UserComponent } from 'libs/ui/src/lib/pages/user/user.component';
import { NavigationComponent } from '../../../../libs/ui/src/lib/pages/navigation/navigation.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: NavigationComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'user/:d', component: UserComponent },
      { path: 'company/:id', component: CompanyComponent },
      { path: 'posting/:id', component: PostingComponent },
      { path: 'search', component: SearchComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), UiModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
