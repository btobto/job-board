import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { errorLogger } from 'src/app/common/helpers/error.logger';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.scss'],
})
export class RegisterCompanyComponent implements OnInit {
  name = '';
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  register() {
    if (this.name && this.email && this.password) {
      this.authService
        .registerCompany({
          name: this.name,
          email: this.email,
          password: this.password,
        })
        .subscribe({
          next: () => {
            this.router.navigateByUrl('/login');
          },
          error: errorLogger,
        });
    } else {
      alert('Fields must not be empty.');
    }
  }
}
