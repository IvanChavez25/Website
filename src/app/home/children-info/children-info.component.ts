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
    ageInMonths: '',
    address: '',
    barangay: '',
    fatherName: '',
    motherName: '',
    gender: null,
    date: '',
  };

  constructor(public database: Database) {}

  onBirthdayChange() {
    this.calculateAge(this.childData.birthday);
    this.calculateAgeInMonths(this.childData.birthday);
  }

  calculateAge(birthdate: string) {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();

    // Check if the birthday has occurred this year
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    // Set age to zero if it's negative
    if (age < 0) {
      age = 0;
    }

    this.childData.age = age.toString();
  }

  calculateAgeInMonths(birthdate: string) {
    const today = new Date();
    const birthDate = new Date(birthdate);
    const years = today.getFullYear() - birthDate.getFullYear();
    const months = today.getMonth() - birthDate.getMonth();
    const ageInMonths = years * 12 + months;

    // Set ageInMonths to zero if it's negative
    if (ageInMonths < 0) {
      this.childData.ageInMonths = '0';
    } else {
      this.childData.ageInMonths = ageInMonths.toString();
    }
  }

  onSubmit() {
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
      age: null, // Clear the age field
      ageInMonths: '',
      address: '',
      barangay: '',
      fatherName: '',
      motherName: '',
      gender: null,
      date: '',
    };
  }

  private isValidChildData(): boolean {
    return (
      this.childData.firstName &&
      this.childData.middleName &&
      this.childData.lastName &&
      this.childData.birthday &&
      (this.childData.age || this.childData.age === 0) &&
      this.childData.ageInMonths &&
      this.childData.address &&
      this.childData.barangay &&
      this.childData.fatherName &&
      this.childData.motherName &&
      this.childData.gender &&
      this.childData.date
    );
  }
}
