import { Component, OnInit } from '@angular/core';
import { Database, ref, get, update, remove } from '@angular/fire/database';
import { Location } from '@angular/common';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
})
export class UserlistComponent {
  userList: User[] = []; // Assuming you have an array of User objects
  selectedUser: User | null = null;

  constructor(public database: Database) {
    this.fetchUserList();
  }

  ngOnInit() {
    this.fetchUserList();
  }

  fetchUserList() {
    const userRecordRef = ref(this.database, 'UserRecord');

    get(userRecordRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userRecords = snapshot.val();

          // Filter out users with a 'role' property equal to 'admin'
          this.userList = (Object.values(userRecords) as User[]).filter(
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

  editUser(user: User) {
    // Set the selected user for editing
    this.selectedUser = user;
  }

  updateUser() {
    if (this.selectedUser) {
      const userRecordRef = ref(
        this.database,
        `UserRecord/${this.selectedUser.uid}`
      );

      // Update the user's data in the database
      update(userRecordRef, this.selectedUser)
        .then(() => {
          // User updated successfully
          console.log('User updated successfully');
          this.selectedUser = null; // Clear the selected user
          this.fetchUserList(); // Refresh the user list
        })
        .catch((error) => {
          console.error('Error updating user:', error);
        });
    }
  }

  cancelEdit() {
    // Clear the selected user without saving changes
    this.selectedUser = null;
  }

  deleteUser(user: User) {
    const userRecordRef = ref(this.database, `UserRecord/${user.uid}`);

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
  username: string = '';
  email: string = '';
  role: string = '';
  password: string = '';
}
