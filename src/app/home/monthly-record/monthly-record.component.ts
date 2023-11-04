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
  selector: 'app-monthly-record',
  templateUrl: './monthly-record.component.html',
  styleUrls: ['./monthly-record.component.css'],
})
export class MonthlyRecordComponent {
  childRecords: any[] = [];

  weight: number = 0;
  heightOrLength: number = 0;

  monthlyHeightRecordData: any = {
    monthlyHeightRecordsId: null,
    nameOfChild: '',
    birthday: '',
    ageInMonths: '',
    weight: '',
    heightOrLength: '',
    nutritionalStatus: '',
    barangay: '',
    Date: '',
    measurementMonth: '',
  };

  searchInput: string = '';
  filteredChildRecords: any[] = [];

  constructor(public database: Database, private location: Location) {
    this.fetchChildRecords();
  }

  onSubmit() {
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
      ageInMonths: '',
      weight: '',
      heightOrLength: '',
      nutritionalStatus: '',
      barangay: '',
      Date: '',
      measurementMonth: '',
    };
  }

  private isValidmonthlyHeightRecordData(): boolean {
    return (
      this.monthlyHeightRecordData.nameOfChild &&
      this.monthlyHeightRecordData.birthday &&
      this.monthlyHeightRecordData.ageInMonths &&
      this.monthlyHeightRecordData.weight &&
      this.monthlyHeightRecordData.heightOrLength &&
      this.monthlyHeightRecordData.nutritionalStatus &&
      this.monthlyHeightRecordData.barangay &&
      this.monthlyHeightRecordData.Date &&
      this.monthlyHeightRecordData.measurementMonth
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
      this.filteredChildRecords = this.childRecords.filter((child) => {
        return (child.firstName + ' ' + child.lastName)
          .toLowerCase()
          .includes(this.searchInput.toLowerCase());
      });
    }
  }

  getSelectedChildAge() {
    const selectedChildName = this.monthlyHeightRecordData.nameOfChild;

    const selectedChild = this.childRecords.find(
      (c) => c === selectedChildName
    );

    if (selectedChild) {
      this.monthlyHeightRecordData.ageInMonths = selectedChild.ageInMonths;
      return selectedChild.ageInMonths;
    } else {
      this.monthlyHeightRecordData.ageInMonths = '';
      return '';
    }
  }

  getSelectedChildBirthday() {
    const selectedChildName = this.monthlyHeightRecordData.nameOfChild;

    const selectedChild = this.childRecords.find(
      (c) => c === selectedChildName
    );

    if (selectedChild) {
      this.monthlyHeightRecordData.birthday = selectedChild.birthday;
      return selectedChild.birthday;
    } else {
      this.monthlyHeightRecordData.birthday = '';
      return '';
    }
  }

  getSelectedChildBarangay() {
    const selectedChildName = this.monthlyHeightRecordData.nameOfChild;

    const selectedChild = this.childRecords.find(
      (c) => c === selectedChildName
    );

    if (selectedChild) {
      this.monthlyHeightRecordData.barangay = selectedChild.barangay;
      return selectedChild.barangay;
    } else {
      this.monthlyHeightRecordData.barangay = '';
      return '';
    }
  }
}
