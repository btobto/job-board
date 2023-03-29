import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { errorLogger } from 'src/app/common/helpers/error.logger';
import { AuthService } from '../../auth.service';
import { Company } from '../../models/company.interface';
import { Person } from '../../models/person.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  companyLogin = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    if (this.email && this.password) {
      if (this.companyLogin) {
        this.authService.loginCompany(this.email, this.password).subscribe({
          next: (user) => {
            this.router.navigateByUrl('/home');
          },
          error: errorLogger,
        });
      } else {
        this.authService.loginPerson(this.email, this.password).subscribe({
          next: (user) => {
            this.router.navigateByUrl('/home');
          },
          error: errorLogger,
        });
      }
    } else {
      alert('Fields must not be empty.');
    }
  }
}
