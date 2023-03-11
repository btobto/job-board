import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UiModule } from '@nbp-it-job-board/ui';
import { CompanyComponent } from 'libs/ui/src/lib/pages/company/company.component';
import { HomeComponent } from 'libs/ui/src/lib/pages/home/home.component';
import { PostingComponent } from 'libs/ui/src/lib/pages/posting/posting.component';
import { SearchComponent } from 'libs/ui/src/lib/pages/search/search.component';
import { UserComponent } from 'apps/client-user/src/app/pages/user/user.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { RegisterComponent } from './pages/register/register.component';

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
