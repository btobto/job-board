import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
})
export class RegisterUserComponent implements OnInit {
  name = '';
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  register() {
    if (this.name && this.email && this.password) {
      this.authService
        .registerUser({
          name: this.name,
          email: this.email,
          password: this.password,
        })
        .subscribe({
          next: () => {
            this.router.navigateByUrl('/login');
          },
        });
    } else {
      alert('Fields must not be empty.');
    }
  }
}
