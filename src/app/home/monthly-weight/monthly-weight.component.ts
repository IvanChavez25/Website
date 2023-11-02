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

  onSubmit() {
    if (this.isValidmonthlyWeightRecordData()) {
      // Query the latest child ID from the MonthlyWeightRecord
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

  getSelectedChildWeight() {
    const selectedChildName = this.monthlyWeightRecordData.nameOfChild;

    const selectedChild = this.childRecords.find(
      (c) => c === selectedChildName
    );

    if (selectedChild) {
      this.monthlyWeightRecordData.weight = selectedChild.weight;
      return selectedChild.weight;
    } else {
      this.monthlyWeightRecordData.weight = '';
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
