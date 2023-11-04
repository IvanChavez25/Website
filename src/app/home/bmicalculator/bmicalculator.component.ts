import { Component } from '@angular/core';
import { Location } from '@angular/common';

import {
  Database,
  set,
  ref,
  get,
} from '@angular/fire/database';

@Component({
  selector: 'app-bmi-calculator',
  templateUrl: './bmicalculator.component.html',
  styleUrls: ['./bmicalculator.component.css'],
})
export class BmiCalculatorComponent {
  childRecords: any[] = [];

  bmiRecordData: any = {
    bmiRecordsId: null,
    childName: '',
    measurementMonth: '',
    barangay: '',
    weight: '',
    height: '',
    age: '',
    bmi: '',
    resultMessage: '',
  };

  searchInput: string = '';
  filteredChildRecords: any[] = [];

  resultMessage: string = '';
  showResult: boolean = false;
  results: {
    childName: string;
    measurementMonth: string;
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

  onSubmit() {
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
      measurementMonth: '',
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
      this.bmiRecordData.measurementMonth &&
      this.bmiRecordData.barangay &&
      this.bmiRecordData.weight &&
      this.bmiRecordData.height &&
      this.bmiRecordData.age &&
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
    if (this.searchInput === '') {
      // Show all children records when the search input is empty
      this.filteredChildRecords = this.childRecords;
    } else {
      // Filter children records based on the search input
      this.filteredChildRecords = this.childRecords.filter((health) => {
        return (health.firstName + ' ' + health.lastName)
          .toLowerCase()
          .includes(this.searchInput.toLowerCase());
      });
    }
  }

  getSelectedChildBarangay() {
    const selectedChildName = this.bmiRecordData.childName;

    const selectedChild = this.childRecords.find(
      (c) => c === selectedChildName
    );

    if (selectedChild) {
      this.bmiRecordData.barangay = selectedChild.barangay;
      return selectedChild.barangay;
    } else {
      this.bmiRecordData.barangay = '';
      return '';
    }
  }

  getSelectedChildAge() {
    const selectedChildName = this.bmiRecordData.childName;

    const selectedChild = this.childRecords.find(
      (c) => c === selectedChildName
    );

    if (selectedChild) {
      this.bmiRecordData.age = selectedChild.age;
      return selectedChild.age;
    } else {
      this.bmiRecordData.age = '';
      return '';
    }
  }

  calculateBMI() {
    const height_m = this.bmiRecordData.height / 100;
    this.bmiRecordData.bmi = this.bmiRecordData.weight / height_m ** 2;

    if (this.bmiRecordData.age > 5) {
      this.bmiRecordData.resultMessage = 'Age must be 5 or below';
      return;
    }

    if (this.bmiRecordData.bmi >= 30) {
      this.bmiRecordData.resultMessage = 'Obese';
    } else if (this.bmiRecordData.bmi >= 25) {
      this.bmiRecordData.resultMessage = 'Overweight';
    } else if (this.bmiRecordData.bmi >= 15) {
      this.bmiRecordData.resultMessage = 'Healthy weight';
    } else if (this.bmiRecordData.bmi >= 12) {
      this.bmiRecordData.resultMessage = 'Underweight';
    } else {
      this.bmiRecordData.resultMessage = 'Severely underweight';
    }

    const newResult = {
      childName: this.bmiRecordData.childName,
      measurementMonth: this.bmiRecordData.measurementMonth,
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
}
