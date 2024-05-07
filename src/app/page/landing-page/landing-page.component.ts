import { Component } from '@angular/core';
import { Database, ref, get, update, remove } from '@angular/fire/database';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  currentYear = new Date().getFullYear();
  userList: User[] = []; // Assuming you have an array of User objects
  selectedUser: User | null = null;

  constructor(public database: Database) {
    this.fetchUserList();
  }

  ngOnInit() {
    this.fetchUserList();
  }

  fetchUserList() {
    const userRecordRef = ref(this.database, 'announcement');

    get(userRecordRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const announcement = snapshot.val();

          // Filter out users with a 'role' property equal to 'admin'
          this.userList = (Object.values(announcement) as User[]).filter(
            (user) => user.role !== 'admin'
          );
        } else {
          this.userList = [];
        }
      })
      .catch((error) => {
        console.error('Error fetching user records:', error);
      });
  }
}

class User {
  uid: number = 0;
  announcement: string = '';
  role: string = '';
  
}
