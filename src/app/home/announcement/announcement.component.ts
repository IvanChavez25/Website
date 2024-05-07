import { Component } from '@angular/core';

import {
  Database,
  set,
  ref,
  push,
  update,
  remove,
  get,
} from '@angular/fire/database';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent {
  userList: User[] = []; // Assuming you have an array of User objects
  selectedUser: User | null = null;

  Announcement: any = {
    uid: null,
    announcement: '',
  };
  createUser() {}

  constructor(public database: Database) {
    this.fetchUserList();
  }

  onSubmit() {
    if (this.isValidnewUser()) {
      // Query the latest child ID from the userRecord
      const latestChildIdRef = ref(this.database, 'announcement');
      get(latestChildIdRef).then((snapshot) => {
        let uid = '10001'; // Initialize with '10001'

        // If there are existing child records, find the latest ID
        if (snapshot.exists()) {
          const announcement = snapshot.val();
          const latestId = Math.max(...Object.keys(announcement).map(Number));
          uid = (latestId + 1).toString();
        }

        this.Announcement.uid = uid;

        const def = 'bhw';

        this.Announcement.role = def;

        // Add newUser to userRecord
        set(ref(this.database, 'announcement/' + uid), this.Announcement)
          .then(() => {
            alert('Announcement Created Successfully');
            this.clearForm();
          })
          .catch((error) => {
            alert('Error adding user: ' + error);
          });
      });
    } else {
      alert('Invalid child data');
      console.log(this.Announcement);
    }
  }

  private clearForm() {
    this.Announcement = {
      announcement: '',
    };
  }

  private isValidnewUser(): boolean {
    return this.Announcement.announcement;
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

  deleteUser(user: User) {
    const userRecordRef = ref(this.database, `announcement/${user.uid}`);

    remove(userRecordRef)
      .then(() => {
        // User deleted successfully, you may want to refresh the user list
        this.fetchUserList();
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  }
}

class User {
  uid: number = 0;
  announcement: string = '';
  role: string = '';
  
}


