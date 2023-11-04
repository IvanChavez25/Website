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
  selector: 'app-monthly-record-infant',
  templateUrl: './monthly-record-infant.component.html',
  styleUrls: ['./monthly-record-infant.component.css'],
})
export class MonthlyRecordInfantComponent {
  childRecords: any[] = [];

  weight: number = 0;
  heightOrLength: number = 0;
  weightForLengthOrHeight: number = 0;
  weightForAge: string = 'SUW';

  monthlyInfantRecordData: any = {
    monthlyInfantRecordsId: null,
    nameOfChild: '',
    birthday: '',
    ageInMonths: '',
    weight: '',
    heightOrLength: '',
    weightForLengthOrHeight: '',
    weightForAge: '',
    heightOrLengths: '',
    weightForLengthorHeight: '',
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
    if (this.isValidmonthlyInfantRecordData()) {
      // Query the latest child ID from the MonthlyInfantRecord
      const latestmonthlyInfantRecordsIdRef = ref(
        this.database,
        'MonthlyInfantRecord'
      );
      get(latestmonthlyInfantRecordsIdRef).then((snapshot) => {
        let monthlyInfantRecordsId = '10001'; // Initialize with '10001'

        // If there are existing monthly infant records, find the latest ID
        if (snapshot.exists()) {
          const monthlyInfantRecord = snapshot.val();
          const latestId = Math.max(
            ...Object.keys(monthlyInfantRecord).map(Number)
          );
          monthlyInfantRecordsId = (latestId + 1).toString();
        }

        this.monthlyInfantRecordData.monthlyInfantRecordsId =
          monthlyInfantRecordsId;

        // Add monthlyInfantRecordData to MonthlyInfantRecord
        set(
          ref(this.database, 'MonthlyInfantRecord/' + monthlyInfantRecordsId),
          this.monthlyInfantRecordData
        )
          .then(() => {
            alert('MonthlyInfantRecord added successfully');
            this.clearForm();
          })
          .catch((error) => {
            alert('Error adding monthly infant record: ' + error);
          });
      });
    } else {
      alert('Invalid monthly infant data');
      console.log(this.monthlyInfantRecordData);
    }
  }

  private clearForm() {
    this.monthlyInfantRecordData = {
      nameOfChild: '',
      birthday: '',
      ageInMonths: '',
      weight: '',
      heightOrLength: '',
      weightForLengthOrHeight: '',
      weightForAge: '',
      heightOrLengths: '',
      weightForLengthorHeight: '',
      barangay: '',
      Date: '',
      measurementMonth: '',
    };
  }

  private isValidmonthlyInfantRecordData(): boolean {
    return (
      this.monthlyInfantRecordData.nameOfChild &&
      this.monthlyInfantRecordData.birthday &&
      this.monthlyInfantRecordData.ageInMonths &&
      this.monthlyInfantRecordData.weight &&
      this.monthlyInfantRecordData.heightOrLength &&
      this.monthlyInfantRecordData.weightForLengthOrHeight &&
      this.monthlyInfantRecordData.weightForAge &&
      this.monthlyInfantRecordData.heightOrLengths &&
      this.monthlyInfantRecordData.weightForLengthorHeight &&
      this.monthlyInfantRecordData.barangay &&
      this.monthlyInfantRecordData.Date &&
      this.monthlyInfantRecordData.measurementMonth
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
    const selectedChildName = this.monthlyInfantRecordData.nameOfChild;

    const selectedChild = this.childRecords.find(
      (c) => c === selectedChildName
    );

    if (selectedChild) {
      this.monthlyInfantRecordData.ageInMonths = selectedChild.ageInMonths;
      return selectedChild.ageInMonths;
    } else {
      this.monthlyInfantRecordData.ageInMonths = '';
      return '';
    }
  }

  getSelectedChildBirthday() {
    const selectedChildName = this.monthlyInfantRecordData.nameOfChild;

    const selectedChild = this.childRecords.find(
      (c) => c === selectedChildName
    );

    if (selectedChild) {
      this.monthlyInfantRecordData.birthday = selectedChild.birthday;
      return selectedChild.birthday;
    } else {
      this.monthlyInfantRecordData.birthday = '';
      return '';
    }
  }

  getSelectedChildBarangay() {
    const selectedChildName = this.monthlyInfantRecordData.nameOfChild;

    const selectedChild = this.childRecords.find(
      (c) => c === selectedChildName
    );

    if (selectedChild) {
      this.monthlyInfantRecordData.barangay = selectedChild.barangay;
      return selectedChild.barangay;
    } else {
      this.monthlyInfantRecordData.barangay = '';
      return '';
    }
  }
}
