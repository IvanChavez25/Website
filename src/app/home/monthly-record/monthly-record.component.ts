import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { Database, set, ref, get } from '@angular/fire/database';

@Component({
  selector: 'app-monthly-record',
  templateUrl: './monthly-record.component.html',
  styleUrls: ['./monthly-record.component.css'],
})
export class MonthlyRecordComponent {
  childRecords: any[] = [];
  searchInput: string = '';
  filteredChildRecords: any[] = [];

  weight: number = 0;
  heightOrLength: number = 0;

  monthlyHeightRecordData: any = {
    monthlyHeightRecordsId: null,
    nameOfChild: '',
    birthday: '',
    age: '',
    ageInMonths: '',
    weight: '',
    heightOrLength: '',
    nutritionalStatus: '',
    barangay: '',
    Date: '',
  };

  constructor(public database: Database, private location: Location) {
    this.fetchChildRecords();
  }

  onBirthdayChange() {
    this.calculateAge(this.monthlyHeightRecordData.birthday);
    this.calculateAgeInMonths(this.monthlyHeightRecordData.birthday);
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

    this.monthlyHeightRecordData.age = age.toString();
  }

  calculateAgeInMonths(birthdate: string) {
    const today = new Date();
    const birthDate = new Date(birthdate);
    const years = today.getFullYear() - birthDate.getFullYear();
    const months = today.getMonth() - birthDate.getMonth();
    const ageInMonths = years * 12 + months;

    // Set ageInMonths to zero if it's negative
    if (ageInMonths < 0) {
      this.monthlyHeightRecordData.ageInMonths = '0';
    } else {
      this.monthlyHeightRecordData.ageInMonths = ageInMonths.toString();
    }
  }

  onSubmit() {
    this.monthlyHeightRecordData.Date = Date.now();
    if (this.isValidmonthlyHeightRecordData()) {
      // Query the latest child ID from the MonthlyHeightRecord
      const latestmonthlyHeightRecordsIdRef = ref(
        this.database,
        'MonthlyHeightRecord'
      );
      get(latestmonthlyHeightRecordsIdRef).then((snapshot) => {
        let monthlyHeightRecordsId = '10001'; // Initialize with '10001'

        // If there are existing monthly height records, find the latest ID
        if (snapshot.exists()) {
          const monthlyHeightRecord = snapshot.val();
          const latestId = Math.max(
            ...Object.keys(monthlyHeightRecord).map(Number)
          );
          monthlyHeightRecordsId = (latestId + 1).toString();
        }

        this.monthlyHeightRecordData.monthlyHeightRecordsId =
          monthlyHeightRecordsId;

        // Add monthlyHeightRecordData to MonthlyHeightRecord
        set(
          ref(this.database, 'MonthlyHeightRecord/' + monthlyHeightRecordsId),
          this.monthlyHeightRecordData
        )
          .then(() => {
            alert('MonthlyHeightRecord added successfully');

            console.log(this.monthlyHeightRecordData);
            this.clearForm();
          })
          .catch((error) => {
            alert('Error adding monthly height record: ' + error);
          });
      });
    } else {
      alert('Invalid monthly height data');
      console.log(this.monthlyHeightRecordData);
    }
  }

  private clearForm() {
    this.monthlyHeightRecordData = {
      nameOfChild: '',
      birthday: '',
      age: '',
      ageInMonths: '',
      weight: '',
      heightOrLength: '',
      nutritionalStatus: '',
      barangay: '',
      Date: '',
    };
  }

  private isValidmonthlyHeightRecordData(): boolean {
    return (
      this.monthlyHeightRecordData.nameOfChild &&
      this.monthlyHeightRecordData.birthday &&
      (this.monthlyHeightRecordData.age ||
        this.monthlyHeightRecordData.age === 0) &&
      this.monthlyHeightRecordData.ageInMonths &&
      this.monthlyHeightRecordData.weight &&
      this.monthlyHeightRecordData.heightOrLength &&
      this.monthlyHeightRecordData.nutritionalStatus &&
      this.monthlyHeightRecordData.barangay
    );
  }

  fetchChildRecords() {
    const childRef = ref(this.database, 'ChildRecord');

    get(childRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.childRecords = Object.values(snapshot.val());
          this.filteredChildRecords = this.childRecords;
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
    this.monthlyHeightRecordData.nameOfChild = this.searchInput;

    if (this.searchInput === '') {
      this.filteredChildRecords = this.childRecords;
    } else {
      this.filteredChildRecords = this.childRecords.filter((child) => {
        return (child.firstName + ' ' + child.lastName)
          .toLowerCase()
          .includes(this.searchInput.toLowerCase());
      });
    }
  }

  getSelectedChildBirthday() {
    const selectedChildName = this.monthlyHeightRecordData.nameOfChild;

    const selectedChild = this.childRecords.find(
      (c) => c.firstName + ' ' + c.lastName === selectedChildName
    );

    if (selectedChild) {
      // Update the monthlyHeightRecordData's birthday
      this.monthlyHeightRecordData.birthday = selectedChild.birthday;

      // Calculate age based on selected child's birthday
      this.calculateAge(this.monthlyHeightRecordData.birthday);
      this.calculateAgeInMonths(this.monthlyHeightRecordData.birthday);

      // Return the selected child's birthday
      return selectedChild.birthday;
    } else {
      // Clear the birthday field if the selected child is not found
      this.monthlyHeightRecordData.birthday = '';
      return '';
    }
  }

  getSelectedChildBarangay() {
    const selectedChildName = this.monthlyHeightRecordData.nameOfChild;

    const selectedChild = this.childRecords.find(
      (c) => c.firstName + ' ' + c.lastName === selectedChildName
    );

    if (selectedChild) {
      this.monthlyHeightRecordData.barangay = selectedChild.barangay;
      return selectedChild.barangay;
    } else {
      this.monthlyHeightRecordData.barangay = '';
      return '';
    }
  }

  calculateBMI() {
    const age = parseInt(this.monthlyHeightRecordData.ageInMonths);
    const heightMeters = this.monthlyHeightRecordData.heightOrLength / 100; // Convert height to meters
    const weight = this.monthlyHeightRecordData.weight;

    if (age > 72) {
      this.monthlyHeightRecordData.nutritionalStatus =
        'Age must be 72 months or below';
      return;
    }

    if (weight && heightMeters && age) {
      const bmi = weight / (heightMeters * heightMeters);

      if (bmi >= 30) {
        this.monthlyHeightRecordData.nutritionalStatus = 'Obese';
      } else if (bmi >= 25) {
        this.monthlyHeightRecordData.nutritionalStatus = 'Overweight';
      } else if (bmi >= 14.1) {
        this.monthlyHeightRecordData.nutritionalStatus = 'Healthy weight';
      } else if (bmi >= 8) {
        this.monthlyHeightRecordData.nutritionalStatus = 'Underweight';
      } else {
        this.monthlyHeightRecordData.nutritionalStatus = 'Severely underweight';
      }
    } else {
      this.monthlyHeightRecordData.nutritionalStatus = ''; // Reset status if data is incomplete
    }
  }
}
