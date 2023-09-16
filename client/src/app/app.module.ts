import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterPersonComponent } from './pages/register-person/register-person.component';
import { RegisterCompanyComponent } from './pages/register-company/register-company.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { MainCardComponent } from './components/main-card/main-card.component';
import { MessagesModule } from 'primeng/messages';
import { StoreModule } from '@ngrx/store';
import { AppState } from './state/app.state';
import { authReducer } from './state/auth/auth.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/auth/auth.effects';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { ControlErrorMessageComponent } from './components/control-error-message/control-error-message.component';
import { MenubarModule } from 'primeng/menubar';
import { SearchComponent } from './pages/search/search.component';
import { PersonComponent } from './pages/person/person.component';
import { CompanyComponent } from './pages/company/company.component';
import { personsReducer } from './state/persons/persons.reducer';
import { GLOBAL_MSG_SERVICE_KEY } from './services/notification.service';
import { PersonsEffects } from './state/persons/persons.effects';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ChipModule } from 'primeng/chip';
import { ListItemComponent } from './components/list-item/list-item.component';
import { EditPersonComponent } from './components/edit-person/edit-person.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { ChipsModule } from 'primeng/chips';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { LocationFormGroupComponent } from './components/location-form-group/location-form-group.component';
import { WorkExperienceFormGroupComponent } from './components/work-experience-form-group/work-experience-form-group.component';
import { EducationFormGroupComponent } from './components/education-form-group/education-form-group.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { FieldsetModule } from 'primeng/fieldset';
import { UnauthorizedErrorInterceptor } from './interceptors/unauthorized-error.interceptor';
import { userReducer } from './state/user/user.reducer';
import { UserEffects } from './state/user/user.effects';
import { companiesReducer } from './state/companies/companies.reducer';
import { CompaniesEffects } from './state/companies/companies.effects';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { TabMenuModule } from 'primeng/tabmenu';
import { PostingsComponent } from './components/postings/postings.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { AboutCompanyComponent } from './components/about-company/about-company.component';
import { EditCompanyComponent } from './components/edit-company/edit-company.component';
import { PostingComponent } from './components/posting/posting.component';
import { ReviewComponent } from './components/review/review.component';
import { postingsReducer } from './state/postings/postings.reducer';
import { PostingsEffects } from './state/postings/postings.effects';
import { CardModule } from 'primeng/card';
import { UserTypeofPipe } from './pipes/user-typeof.pipe';
import { UpsertPostingComponent } from './components/upsert-posting/upsert-posting.component';
import { UserToTypePipe } from './pipes/user-to-type.pipe';
import { PostingInterceptor } from './interceptors';
import { ApplicantsDialogComponent } from './components/applicants-dialog/applicants-dialog.component';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterPersonComponent,
    RegisterCompanyComponent,
    HomeComponent,
    PageNotFoundComponent,
    NavbarComponent,
    MainCardComponent,
    ControlErrorMessageComponent,
    SearchComponent,
    PersonComponent,
    CompanyComponent,
    ListItemComponent,
    EditPersonComponent,
    LocationFormGroupComponent,
    WorkExperienceFormGroupComponent,
    EducationFormGroupComponent,
    SafeUrlPipe,
    PostingsComponent,
    ReviewsComponent,
    AboutCompanyComponent,
    EditCompanyComponent,
    PostingComponent,
    ReviewComponent,
    UserTypeofPipe,
    UpsertPostingComponent,
    UserToTypePipe,
    ApplicantsDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    InputTextModule,
    RatingModule,
    BrowserAnimationsModule,
    CheckboxModule,
    ButtonModule,
    MessagesModule,
    StoreModule.forRoot<AppState>({
      auth: authReducer,
      user: userReducer,
      persons: personsReducer,
      companies: companiesReducer,
      postings: postingsReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([AuthEffects, UserEffects, PersonsEffects, CompaniesEffects, PostingsEffects]),
    HttpClientModule,
    ToastModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    DropdownModule,
    MenubarModule,
    ChipModule,
    DynamicDialogModule,
    FileUploadModule,
    ChipsModule,
    InputTextareaModule,
    InputNumberModule,
    FieldsetModule,
    TabMenuModule,
    CardModule,
    TableModule,
    PaginatorModule,
    AvatarModule,
    AvatarGroupModule,
  ],
  providers: [
    MessageService,
    ConfirmationService,
    DialogService,
    { provide: GLOBAL_MSG_SERVICE_KEY, useValue: 'globalToast' },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: PostingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
