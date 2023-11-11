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
  selector: 'app-monthly-weight',
  templateUrl: './monthly-weight.component.html',
  styleUrls: ['./monthly-weight.component.css'],
})
export class MonthlyWeightComponent {
  childRecords: any[] = [];
  searchInput: string = '';
  filteredChildRecords: any[] = [];

  weight: number = 0;

  monthlyWeightRecordData: any = {
    monthlyWeightRecordsId: null,
    nameOfChild: '',
    birthday: '',
    ageInMonths: '',
    weight: '',
    weightStatus: '',
    dateOfWeighing: '',
    barangay: '',
    Date: '',
    measurementMonth: '',
  };

  constructor(public database: Database, private location: Location) {
    this.fetchChildRecords();
  }


  onWeightStatusChange() {
    this.calculateNutritionalStatus(this.monthlyWeightRecordData.ageInMonths, this.monthlyWeightRecordData.weight );
   
  }

  calculateNutritionalStatus(age: number, weight: number) {
    if (age = 0) {
      if (weight <= 2.0) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 2.3) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 4.2) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else if (weight <= 4.3) {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age = 1) {
      if (weight <= 2.7) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 3.1) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 5.5) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else if (weight <= 5.6) {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age = 2) {
      if (weight <= 3.4) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 3.8) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 6.6) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else if (weight <= 6.7) {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age = 3) {
      if (weight <= 4.0) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 4.4) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 7.5) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else if (weight <= 7.6) {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else {
      this.monthlyWeightRecordData.weightStatus = 'Unknown';
    }
  }
  
  onSubmit() {
    if (this.isValidmonthlyWeightRecordData()) {
      const latestmonthlyWeightRecordsIdRef = ref(
        this.database,
        'MonthlyWeightRecord'
      );

      get(latestmonthlyWeightRecordsIdRef).then((snapshot) => {
        let monthlyWeightRecordsId = '10001'; // Initialize with '10001'

        // If there are existing monthly weight records, find the latest ID
        if (snapshot.exists()) {
          const monthlyWeightRecord = snapshot.val();
          const latestId = Math.max(
            ...Object.keys(monthlyWeightRecord).map(Number)
          );
          monthlyWeightRecordsId = (latestId + 1).toString();
        }

        this.monthlyWeightRecordData.monthlyWeightRecordsId =
          monthlyWeightRecordsId;

        // Add monthlyWeightRecordData to MonthlyWeightRecord
        set(
          ref(this.database, 'MonthlyWeightRecord/' + monthlyWeightRecordsId),
          this.monthlyWeightRecordData
        )
          .then(() => {
            alert('MonthlyWeightRecord added successfully');
            this.clearForm();
          })
          .catch((error) => {
            alert('Error adding monthly weight record: ' + error);
          });
      });
    } else {
      alert('Invalid monthly weight data');
      console.log(this.monthlyWeightRecordData);
    }
  }

  private clearForm() {
    this.monthlyWeightRecordData = {
      nameOfChild: '',
      birthday: '',
      ageInMonths: '',
      weight: '',
      weightStatus: '',
      dateOfWeighing: '',
      barangay: '',
      Date: '',
      measurementMonth: '',
    };
  }

  private isValidmonthlyWeightRecordData(): boolean {
    return (
      this.monthlyWeightRecordData.nameOfChild &&
      this.monthlyWeightRecordData.birthday &&
      this.monthlyWeightRecordData.ageInMonths &&
      this.monthlyWeightRecordData.weight &&
      this.monthlyWeightRecordData.weightStatus &&
      this.monthlyWeightRecordData.dateOfWeighing &&
      this.monthlyWeightRecordData.barangay &&
      this.monthlyWeightRecordData.Date &&
      this.monthlyWeightRecordData.measurementMonth
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

  getSelectedChildAge() {
    const selectedChildName = this.monthlyWeightRecordData.nameOfChild;

    const selectedChild = this.childRecords.find(
      (c) => c === selectedChildName
    );

    if (selectedChild) {
      this.monthlyWeightRecordData.ageInMonths = selectedChild.ageInMonths;
      return selectedChild.ageInMonths;
    } else {
      this.monthlyWeightRecordData.ageInMonths = '';
      return '';
    }
  }

  getSelectedChildBirthday() {
    const selectedChildName = this.monthlyWeightRecordData.nameOfChild;

    const selectedChild = this.childRecords.find(
      (c) => c === selectedChildName
    );

    if (selectedChild) {
      this.monthlyWeightRecordData.birthday = selectedChild.birthday;
      return selectedChild.birthday;
    } else {
      this.monthlyWeightRecordData.birthday = '';
      return '';
    }
  }

  getSelectedChildBarangay() {
    const selectedChildName = this.monthlyWeightRecordData.nameOfChild;

    const selectedChild = this.childRecords.find(
      (c) => c === selectedChildName
    );

    if (selectedChild) {
      this.monthlyWeightRecordData.barangay = selectedChild.barangay;
      return selectedChild.barangay;
    } else {
      this.monthlyWeightRecordData.barangay = '';
      return '';
    }
  }
}
