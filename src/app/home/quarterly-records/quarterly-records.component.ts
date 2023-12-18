import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { Database, set, ref, get } from '@angular/fire/database';

@Component({
  selector: 'app-quarterly-records',
  templateUrl: './quarterly-records.component.html',
  styleUrls: ['./quarterly-records.component.css'],
})
export class QuarterlyRecordsComponent {
  childRecords: any[] = [];
  searchInput: string = '';
  filteredChildRecords: any[] = [];

  barangay: string = 'ABUNG';
  weight: number = 0;
  heightOrLength: number = 0;
  weightForLengthOrHeight: number = 0;

  quarterlyData: any = {
    quarterlyId: null,
    nameOfChild: '',
    birthday: '',
    age: '',
    ageInMonths: '',
    weight: '',
    height: '',
    bmiData: '',
    nutritionalStatus: '',
    barangay: '',
    Date: '',
  };

  constructor(public database: Database, private location: Location) {
    this.fetchChildRecords();
  }

  onBirthdayChange() {
    this.calculateAge(this.quarterlyData.birthday);
    this.calculateAgeInMonth(this.quarterlyData.birthday);
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

    this.quarterlyData.age = age.toString();
  }

  calculateAgeInMonth(birthdate: string) {
    const today = new Date();
    const birthDate = new Date(birthdate);
    const years = today.getFullYear() - birthDate.getFullYear();
    const months = today.getMonth() - birthDate.getMonth();
    const ageInMonth = years * 12 + months;

    // Set ageInMonths to zero if it's negative
    if (ageInMonth < 0) {
      this.quarterlyData.ageInMonths = '0';
    } else {
      this.quarterlyData.ageInMonths = ageInMonth.toString();
    }
  }

  onSubmit() {
    this.quarterlyData.Date = Date.now();
    if (this.isValidquarterlyData()) {
      // Query the latest child ID from the ChildProfile
      const latestquarterlyIdRef = ref(this.database, 'QuarterlyTable');
      get(latestquarterlyIdRef).then((snapshot) => {
        let quarterlyId = '101'; // Initialize with '10001'

        // If there are existing child records, find the latest ID
        if (snapshot.exists()) {
          const QuarterlyTable = snapshot.val();
          const latestId = Math.max(...Object.keys(QuarterlyTable).map(Number));
          quarterlyId = (latestId + 1).toString();
        }

        this.quarterlyData.quarterlyId = quarterlyId;

        // Add childData to ChildProfile
        set(
          ref(this.database, 'QuarterlyTable/' + quarterlyId),
          this.quarterlyData
        )
          .then(() => {
            alert('QuarterlyTable added successfully');
            this.clearForm();
          })
          .catch((error) => {
            alert('Error adding children: ' + error);
          });
      });
    } else {
      alert('Invalid child data');
      console.log(this.quarterlyData);
    }
  }

  private clearForm() {
    this.quarterlyData = {
      nameOfChild: '',
      birthday: '',
      age: '',
      ageInMonths: '',
      weight: '',
      height: '',
      bmiData: '',
      nutritionalStatus: '',
      barangay: '',
      Date: '',
    };
  }

  private isValidquarterlyData(): boolean {
    return (
      this.quarterlyData.nameOfChild &&
      this.quarterlyData.birthday &&
      (this.quarterlyData.age || this.quarterlyData.age === 0) &&
      this.quarterlyData.ageInMonths &&
      this.quarterlyData.weight &&
      this.quarterlyData.height &&
      this.quarterlyData.bmiData &&
      this.quarterlyData.nutritionalStatus &&
      this.quarterlyData.barangay
    );
  }
  fetchChildRecords() {
    const childRef = ref(this.database, 'ChildRecord');

    get(childRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.childRecords = Object.values(snapshot.val());
          this.filteredChildRecords = this.childRecords; // Initialize filtered records
        } else {
          this.childRecords = [];
          this.filteredChildRecords = [];
        }
      })
      .catch((error) => {
        console.error('Error retrieving records:', error);
      });
  }

  onSearchInputChange() {
    this.quarterlyData.nameOfChild = this.searchInput;

    if (this.searchInput === '') {
      // Show all children records when the search input is empty
      this.filteredChildRecords = this.childRecords;
    } else {
      // Filter children records based on the search input
      this.filteredChildRecords = this.childRecords.filter((child) => {
        return (child.firstName + ' ' + child.lastName)
          .toLowerCase()
          .includes(this.searchInput.toLowerCase());
      });
    }
  }

  getSelectedChildBirthday() {
    const selectedChildName = this.quarterlyData.nameOfChild;

    const selectedChild = this.childRecords.find(
      (c) => c.firstName + ' ' + c.lastName === selectedChildName
    );

    if (selectedChild) {
      // Update the monthlyHeightRecordData's birthday
      this.quarterlyData.birthday = selectedChild.birthday;

      // Calculate age based on selected child's birthday
      this.calculateAge(this.quarterlyData.birthday);
      this.calculateAgeInMonth(this.quarterlyData.birthday);

      // Return the selected child's birthday
      return selectedChild.birthday;
    } else {
      // Clear the birthday field if the selected child is not found
      this.quarterlyData.birthday = '';
      return '';
    }
  }

  getSelectedChildBarangay() {
    const selectedChildName = this.quarterlyData.nameOfChild;

    const selectedChild = this.childRecords.find(
      (c) => c.firstName + ' ' + c.lastName === selectedChildName
    );

    if (selectedChild) {
      this.quarterlyData.barangay = selectedChild.barangay;
      return selectedChild.barangay;
    } else {
      this.quarterlyData.barangay = '';
      return '';
    }
  }
  calculateBMI() {
    const age = parseInt(this.quarterlyData.ageInMonths);
    const heightMeters = this.quarterlyData.height / 100; // Convert height to meters
    const weight = this.quarterlyData.weight;

    if (age > 72) {
      this.quarterlyData.nutritionalStatus = 'Age must be 72 months or below';
      return;
    }

    if (weight && heightMeters && age) {
      const bmi = weight / (heightMeters * heightMeters);

      this.quarterlyData.bmiData = bmi;

      if (bmi >= 30) {
        this.quarterlyData.nutritionalStatus = 'Ob';
      } else if (bmi >= 25) {
        this.quarterlyData.nutritionalStatus = 'OW';
      } else if (bmi >= 14.1) {
        this.quarterlyData.nutritionalStatus = 'N';
      } else if (bmi >= 8) {
        this.quarterlyData.nutritionalStatus = 'UW';
      } else {
        this.quarterlyData.nutritionalStatus = 'SUW';
      }
    } else {
      this.quarterlyData.nutritionalStatus = ''; // Reset status if data is incomplete
    }
  }
}
