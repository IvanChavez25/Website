import { Component, OnInit } from '@angular/core';
import { Database, ref, get } from '@angular/fire/database';
import { Router } from '@angular/router';
import { AuthServiceService } from '../page/login/auth-service.service'; // Import AuthService
import { SharedDataServiceService } from './shared-data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userRole: string = 'bhw'; // Set "bhw" as the default role.
  username!: string

  constructor(
    public database: Database,
    private router: Router,
    private authService: AuthServiceService,
    private sharedDataService: SharedDataServiceService
  ) {
    // Inject AuthService
  }

  ngOnInit() {
    const uid = this.authService.uid; // Get uid from AuthService

    if (uid) {
      this.fetchUserRecords(uid);
      this.fetchUsername(uid); // Fetch the username
    } else {
      // Handle the case where uid is not available.
      // For example, redirect back to the login page:
      this.router.navigate(['/login']);
    }

    if (uid) {
      // Set the uid in the shared service
      this.sharedDataService.setUid(uid);
    } else {
      // Handle the case where uid is not available.
    }
  }

  fetchUserRecords(uid: string) {
    const childRef = ref(this.database, 'UserRecord/' + uid + '/role');

    get(childRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.userRole = snapshot.val();
        } else {
          console.error('User role not found.');
        }
      })
      .catch((error) => {
        console.error('Error retrieving user role:', error);
      });
  }

  fetchUsername(uid: string) {
    const usernameRef = ref(this.database, 'UserRecord/' + uid + '/username');

    get(usernameRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.username = snapshot.val();
        } else {
          console.error('Username not found.');
        }
      })
      .catch((error) => {
        console.error('Error retrieving username:', error);
      });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}