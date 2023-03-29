import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-person-register',
  templateUrl: './person-register.component.html',
  styleUrls: ['./person-register.component.scss'],
})
export class PersonRegisterComponent implements OnInit {
  name = '';
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  register() {
    if (this.name && this.email && this.password) {
      this.authService
        .registerPerson({
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
