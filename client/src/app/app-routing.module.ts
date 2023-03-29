import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterCompanyComponent } from './auth/pages/register-company/register-company.component';
import { RegisterUserComponent } from './auth/pages/register-user/register-user.component';
import { NavbarComponent } from './common/components/navbar/navbar.component';
import { HomeComponent } from './common/pages/home/home.component';
import { SearchComponent } from './common/pages/search/search.component';
import { CompanyComponent } from './company/pages/company/company.component';
import { PostingComponent } from './posting/pages/posting/posting.component';
import { ReviewsComponent } from './review/pages/reviews/reviews.component';
import { UserComponent } from './user/pages/user/user.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'user/register', component: RegisterUserComponent },
  { path: 'company/register', component: RegisterCompanyComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '',
    component: NavbarComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'search', component: SearchComponent },
      { path: 'user/:id', component: UserComponent },
      { path: 'company/:id', component: CompanyComponent },
      { path: 'posting/:id', component: PostingComponent },
      { path: 'reviews/:id', component: ReviewsComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
