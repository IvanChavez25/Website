import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

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
  selector: 'app-children-info',
  templateUrl: './children-info.component.html',
  styleUrls: ['./children-info.component.css'],
})
export class ChildrenInfoComponent {
  childData: any = {
    childrenId: null,
    firstName: '',
    middleName: '',
    lastName: '',
    birthday: null,
    age: null,
    address: '',
    barangay: '',
    fatherName: '',
    motherName: '',
    gender: null,
  };

  constructor(public database: Database) {}

  onSubmit() {
    if (this.isValidchildData()) {
      // Query the latest child ID from the ChildRecord
      const latestChildIdRef = ref(this.database, 'ChildRecord');
      get(latestChildIdRef).then((snapshot) => {
        let childrenId = '10001'; // Initialize with '10001'

        // If there are existing child records, find the latest ID
        if (snapshot.exists()) {
          const childRecords = snapshot.val();
          const latestId = Math.max(...Object.keys(childRecords).map(Number));
          childrenId = (latestId + 1).toString();
        }

        this.childData.childrenId = childrenId;

        // Add childData to ChildRecord
        set(ref(this.database, 'ChildRecord/' + childrenId), this.childData)
          .then(() => {
            alert('ChildRecoded added successfully');
            this.clearForm();
          })
          .catch((error) => {
            alert('Error adding children: ' + error);
          });
      });
    } else {
      alert('Invalid child data');
      console.log(this.childData);
    }
  }

  private clearForm() {
    this.childData = {
      firstName: '',
      middleName: '',
      lastName: '',
      birthday: '',
      age: '',
      address: '',
      barangay: '',
      fatherName: '',
      motherName: '',
      gender: '',
    };
  }

  private isValidchildData(): boolean {
    return (
      this.childData.firstName &&
      this.childData.middleName &&
      this.childData.lastName &&
      this.childData.birthday &&
      this.childData.age &&
      this.childData.address &&
      this.childData.barangay &&
      this.childData.fatherName &&
      this.childData.motherName &&
      this.childData.gender
    );
  }
}
