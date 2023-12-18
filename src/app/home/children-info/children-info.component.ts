import { Component } from '@angular/core';

import {
  Database,
  set,
  ref,
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
    address: '',
    barangay: '',
    fatherName: '',
    motherName: '',
    NameOfHouseholdHead: '',
    gender: null,
    Date: '',
  };

  constructor(public database: Database) {}

  onSubmit() {

    this.childData.Date = Date.now();

    if (this.isValidChildData()) {
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
            alert('ChildRecord added successfully');
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
      address: '',
      barangay: '',
      fatherName: '',
      motherName: '',
      NameOfHouseholdHead: '',
      gender: null,
      Date: '',
    };
  }

  private isValidChildData(): boolean {
    return (
      this.childData.firstName &&
      this.childData.middleName &&
      this.childData.lastName &&
      this.childData.birthday &&
      this.childData.address &&
      this.childData.barangay &&
      this.childData.fatherName &&
      this.childData.motherName &&
      this.childData.NameOfHouseholdHead &&
      this.childData.gender &&
      this.childData.Date
    );
  }
}
