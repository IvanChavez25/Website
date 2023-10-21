import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginFormComponent {
  model: any = {
    username: '',
    password: '',
  };

  constructor(private router: Router) {}

  login() {
    if (this.model.username === 'admin' && this.model.password === 'admin') {
      alert('Login successful');

      this.router.navigate(['/home']);
    } else {
      alert('Login failed');
    }
  }
}
