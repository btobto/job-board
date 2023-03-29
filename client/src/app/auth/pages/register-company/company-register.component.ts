import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { errorLogger } from 'src/app/common/helpers/error.logger';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.scss'],
})
export class CompanyRegisterComponent implements OnInit {
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
