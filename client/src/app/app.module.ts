import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './common/components/navbar/navbar.component';
import { HomeComponent } from './common/pages/home/home.component';
import { SearchComponent } from './common/pages/search/search.component';
import { TokenInterceptor } from './auth/interceptors/token.interceptor';
import { ErrorInterceptor } from './auth/interceptors/error.interceptor';
import { AuthModule } from './auth/auth.module';
import { UserTypeOfPipe } from './common/pipes/user-type-of.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SearchComponent,
    UserTypeOfPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, AuthModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
