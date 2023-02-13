import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './pages/company/company.component';
import { AppRoutingModule } from '../../../../apps/client-user/src/app/app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { PostingComponent } from './pages/posting/posting.component';
import { RegisterComponent } from './pages/register/register.component';
import { SearchComponent } from './pages/search/search.component';
import { UserComponent } from './pages/user/user.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    CompanyComponent,
    HomeComponent,
    LoginComponent,
    NavigationComponent,
    PostingComponent,
    RegisterComponent,
    SearchComponent,
    UserComponent,
  ],
  exports: [
    CompanyComponent,
    HomeComponent,
    LoginComponent,
    NavigationComponent,
    PostingComponent,
    RegisterComponent,
    SearchComponent,
    UserComponent,
  ],
})
export class UiModule {}
