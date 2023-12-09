import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { Database, set, ref, get } from '@angular/fire/database';

@Component({
  selector: 'app-bmi-calculator',
  templateUrl: './bmicalculator.component.html',
  styleUrls: ['./bmicalculator.component.css'],
})
export class BmiCalculatorComponent {
  childRecords: any[] = [];
  searchInput: string = '';
  filteredChildRecords: any[] = [];

  bmiRecordData: any = {
    bmiRecordsId: null,
    childName: '',
    barangay: '',
    weight: '',
    height: '',
    birthday: '',
    age: '',
    bmi: '',
    resultMessage: '',
    Date: '',
  };

  resultMessage: string = '';
  showResult: boolean = false;
  results: {
    childName: string;
    barangay: string;
    weight: number;
    height: number;
    age: number;
    bmi: number;
    resultMessage: string;
  }[] = [];

  constructor(public database: Database, private location: Location) {
    this.fetchChildRecords();
  }

  onBirthdayChange() {
    this.calculateAge(this.bmiRecordData.birthday);
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

    this.bmiRecordData.age = age.toString();
  }

  onSubmit() {
    this.bmiRecordData.Date = Date.now();
    this.calculateBMI();

    if (this.isValidbmiRecordData()) {
      // Query the latest child ID from the MonthlyHeightRecord
      const latestbmiRecordsIdRef = ref(this.database, 'BmiRecord');
      get(latestbmiRecordsIdRef).then((snapshot) => {
        let bmiRecordsId = '10001'; // Initialize with '10001'

        // If there are existing health records, find the latest ID
        if (snapshot.exists()) {
          const bmiRecord = snapshot.val();
          const latestId = Math.max(...Object.keys(bmiRecord).map(Number));
          bmiRecordsId = (latestId + 1).toString();
        }

        this.bmiRecordData.bmiRecordsId = bmiRecordsId;

        // Add bmiRecordData to bmiRecord
        set(ref(this.database, 'BmiRecord/' + bmiRecordsId), this.bmiRecordData)
          .then(() => {
            alert('BmiRecord added successfully');
            this.clearForm();
          })
          .catch((error) => {
            alert('Error adding bmi record: ' + error);
          });
      });
    } else {
      alert('Invalid monthly bmi data');
      console.log(this.bmiRecordData);
    }
  }

  private clearForm() {
    this.bmiRecordData = {
      childName: '',
      barangay: '',
      weight: '',
      height: '',
      age: '',
      bmi: '',
      resultMessage: '',
    };
  }

  private isValidbmiRecordData(): boolean {
    return (
      this.bmiRecordData.childName &&
      this.bmiRecordData.barangay &&
      this.bmiRecordData.weight &&
      this.bmiRecordData.height &&
      (this.bmiRecordData.age || this.bmiRecordData.age === 0) &&
      this.bmiRecordData.birthday &&
      this.bmiRecordData.bmi &&
      this.bmiRecordData.resultMessage
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
    this.bmiRecordData.childName = this.searchInput;

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

  getSelectedChildBarangay() {
    const selectedChildName = this.bmiRecordData.childName;

    const selectedChild = this.childRecords.find(
      (c) => c.firstName + ' ' + c.lastName === selectedChildName
    );

    if (selectedChild) {
      this.bmiRecordData.barangay = selectedChild.barangay;
      return selectedChild.barangay;
    } else {
      this.bmiRecordData.barangay = '';
      return '';
    }
  }

  getSelectedChildBirthday() {
    const selectedChildName = this.bmiRecordData.childName;

    const selectedChild = this.childRecords.find(
      (c) => c.firstName + ' ' + c.lastName === selectedChildName
    );

    if (selectedChild) {
      // Update the monthlyHeightRecordData's birthday
      this.bmiRecordData.birthday = selectedChild.birthday;

      // Calculate age based on selected child's birthday
      this.calculateAge(this.bmiRecordData.birthday);

      // Return the selected child's birthday
      return selectedChild.birthday;
    } else {
      // Clear the birthday field if the selected child is not found
      this.bmiRecordData.birthday = '';
      return '';
    }
  }

  calculateBMI() {
    if (this.bmiRecordData.age > 5) {
      this.bmiRecordData.resultMessage = 'Age must be 5 or below';
      return;
    }

    const height_m = this.bmiRecordData.height / 100;
    this.bmiRecordData.bmi = (
      this.bmiRecordData.weight /
      height_m ** 2
    ).toFixed(2);

    if (this.bmiRecordData.bmi >= 30) {
      this.bmiRecordData.resultMessage = 'Obese';
    } else if (this.bmiRecordData.bmi >= 25) {
      this.bmiRecordData.resultMessage = 'Overweight';
    } else if (this.bmiRecordData.bmi >= 14.1) {
      this.bmiRecordData.resultMessage = 'Healthy weight';
    } else if (this.bmiRecordData.bmi >= 8) {
      this.bmiRecordData.resultMessage = 'Underweight';
    } else {
      this.bmiRecordData.resultMessage = 'Severely underweight';
    }

    const newResult = {
      childName: this.bmiRecordData.childName,
      barangay: this.bmiRecordData.barangay,
      weight: this.bmiRecordData.weight,
      height: this.bmiRecordData.height,
      age: this.bmiRecordData.age,
      bmi: this.bmiRecordData.bmi,
      resultMessage: this.bmiRecordData.resultMessage,
    };

    this.results.push(newResult);

    this.results.sort((a, b) => a.bmi - b.bmi);
  }

  // calculateBMI() {
  //   const height_m = this.bmiRecordData.height / 100;
  //   this.bmiRecordData.bmi = this.bmiRecordData.weight / height_m ** 2;

  //   if (this.bmiRecordData.age > 5) {
  //     this.bmiRecordData.resultMessage = 'Age must be 5 or below';
  //     return;
  //   }

  //   if (this.bmiRecordData.bmi >= 30) {
  //     this.bmiRecordData.resultMessage = 'Obese';
  //   } else if (this.bmiRecordData.bmi >= 25) {
  //     this.bmiRecordData.resultMessage = 'Overweight';
  //   } else if (this.bmiRecordData.bmi >= 15) {
  //     this.bmiRecordData.resultMessage = 'Healthy weight';
  //   } else if (this.bmiRecordData.bmi >= 12) {
  //     this.bmiRecordData.resultMessage = 'Underweight';
  //   } else {
  //     this.bmiRecordData.resultMessage = 'Severely underweight';
  //   }

  //   const newResult = {
  //     childName: this.bmiRecordData.childName,
  //     measurementMonth: this.bmiRecordData.measurementMonth,
  //     barangay: this.bmiRecordData.barangay,
  //     weight: this.bmiRecordData.weight,
  //     height: this.bmiRecordData.height,
  //     age: this.bmiRecordData.age,
  //     bmi: this.bmiRecordData.bmi,
  //     resultMessage: this.bmiRecordData.resultMessage,
  //   };

  //   this.results.push(newResult);

  //   this.results.sort((a, b) => a.bmi - b.bmi);
  // }
}
