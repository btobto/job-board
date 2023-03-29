import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { AuthService } from './auth.service';
import { PersonRegisterComponent } from './pages/person-register/person-register.component';
import { CompanyRegisterComponent } from './pages/register-company/company-register.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LoginComponent,
    PersonRegisterComponent,
    CompanyRegisterComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule],
  providers: [AuthService],
})
export class AuthModule {}
