import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Database, ref, get, update, remove } from '@angular/fire/database';
import { Location } from '@angular/common';
import { AuthServiceService } from './auth-service.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginFormComponent {
  currentYear = new Date().getFullYear();
  userRecords: any[] = [];

  model: any = {
    username: '',
    password: '',
  };

  constructor(
    public database: Database,
    private router: Router,
    private location: Location,
    private authService: AuthServiceService // Inject AuthService
  ) {
    this.fetchUserRecords();
  }

  login() {
    const { username, password } = this.model;
    const user = this.userRecords.find(
      (u) =>
        (u.username === username && u.password === password) ||
        (u.email === username && u.password === password)
    );

    console.log(username, password);

    if (user) {
      if (user.role === 'admin') {
        alert(`Login successful Admin`);
      } else if (user.role === 'bhw') {
        alert(`Login successful BhW`);
      }

      // Set uid in AuthService
      this.authService.uid = user.uid;

      this.router.navigate(['/home/dashboard']);
    } else {
      alert('Login failed');
    }
  }

  fetchUserRecords() {
    const childRef = ref(this.database, 'UserRecord');

    get(childRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.userRecords = Object.values(snapshot.val());
        } else {
          this.userRecords = [];
        }
      })
      .catch((error) => {
        console.error('Error retrieving records:', error);
      });
  }
}
