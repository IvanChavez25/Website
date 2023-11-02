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
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css'],
})
export class UserAccountComponent {
  newUser: any = {
    uid: null,
    username: '',
    email: '',
    password: '',
    role: '',
  };
  createUser() {}

  constructor(public database: Database) {}

  onSubmit() {
    if (this.isValidnewUser()) {
      // Query the latest child ID from the userRecord
      const latestChildIdRef = ref(this.database, 'UserRecord');
      get(latestChildIdRef).then((snapshot) => {
        let uid = '10001'; // Initialize with '10001'

        // If there are existing child records, find the latest ID
        if (snapshot.exists()) {
          const userRecords = snapshot.val();
          const latestId = Math.max(...Object.keys(userRecords).map(Number));
          uid = (latestId + 1).toString();
        }

        this.newUser.uid = uid;

        const def = 'bhw';

        this.newUser.role = def;

        // Add newUser to userRecord
        set(ref(this.database, 'UserRecord/' + uid), this.newUser)
          .then(() => {
            alert('UserRecord added successfully');
            this.clearForm();
          })
          .catch((error) => {
            alert('Error adding user: ' + error);
          });
      });
    } else {
      alert('Invalid child data');
      console.log(this.newUser);
    }
  }

  private clearForm() {
    this.newUser = {
      username: '',
      email: '',
      password: '',
    };
  }

  private isValidnewUser(): boolean {
    return this.newUser.username && this.newUser.email && this.newUser.password;
  }
}
