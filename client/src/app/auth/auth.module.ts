import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { AuthService } from './auth.service';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { RegisterCompanyComponent } from './pages/register-company/register-company.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterUserComponent,
    RegisterCompanyComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule],
  providers: [AuthService],
})
export class AuthModule {}
