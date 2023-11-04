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
  selector: 'app-nutritional-status',
  templateUrl: './nutritional-status.component.html',
  styleUrls: ['./nutritional-status.component.css'],
})
export class NutritionalStatusComponent {
  childRecords: any[] = [];

  nutritionalData: any = {
    nutritionalId: null,
    nameOfChild: '',
    fatherName: '',
    motherName: '',
    barangay: '',
    birthday: '',
    OPTPlus: '',
    ageInMonths: '',
    weight: '',
    height: '',
    weightForAge: '',
    heightForAge: '',
    weightForHeight: '',
    practicingEDF: null,
    practicingCF: null,
    ageStartedCF: '',
    beneficiarySF: null,
    vitaminALastReceived: '',
    ironReceived: '',
    usingMNP: '',
    date: '',
    measurementMonth: '',
  };

  searchInput: string = '';
  filteredChildRecords: any[] = [];

  constructor(public database: Database, private location: Location) {
    this.fetchChildRecords();
  }

  onSubmit() {
    if (this.isValidnutritionalData()) {
      // Query the latest nutritional ID from the NutritionalRecord
      const latestnutritionalIdRef = ref(this.database, 'NutritionalRecord');
      get(latestnutritionalIdRef).then((snapshot) => {
        let nutritionalId = '10001'; // Initialize with '1'

        // If there are existing nutritional records, find the latest ID
        if (snapshot.exists()) {
          const nutritionalRecord = snapshot.val();
          const latestId = Math.max(
            ...Object.keys(nutritionalRecord).map(Number)
          );
          nutritionalId = (latestId + 1).toString();
        }

        this.nutritionalData.nutritionalId = nutritionalId;
        
        set(
          ref(this.database, 'NutritionalRecord/' + nutritionalId),
          this.nutritionalData
        )
          .then(() => {
            alert('NutritionalRecord added successfully');
            this.clearForm();
          })
          .catch((error) => {
            alert('Error adding nutritional: ' + error);
          });
      });
    } else {
      alert('Invalid nutritional data');
      console.log(this.nutritionalData);
    }
  }

  private clearForm() {
    this.nutritionalData = {
      nameOfChild: '',
      fatherName: '',
      motherName: '',
      barangay: '',
      birthday: '',
      OPTPlus: '',
      ageInMonths: '',
      weight: '',
      height: '',
      weightForAge: '',
      heightForAge: '',
      weightForHeight: '',
      practicingEDF: '',
      practicingCF: '',
      ageStartedCF: '',
      beneficiarySF: '',
      vitaminALastReceived: '',
      ironReceived: '',
      usingMNP: '',
      date: '',
      measurementMonth: '',
    };
  }

  private isValidnutritionalData(): boolean {
    return (
      this.nutritionalData.nameOfChild &&
      this.nutritionalData.fatherName &&
      this.nutritionalData.motherName &&
      this.nutritionalData.barangay &&
      this.nutritionalData.birthday &&
      this.nutritionalData.OPTPlus &&
      this.nutritionalData.ageInMonths &&
      this.nutritionalData.weight &&
      this.nutritionalData.height &&
      this.nutritionalData.weightForAge &&
      this.nutritionalData.heightForAge &&
      this.nutritionalData.weightForHeight &&
      this.nutritionalData.practicingEDF &&
      this.nutritionalData.practicingCF &&
      this.nutritionalData.ageStartedCF &&
      this.nutritionalData.beneficiarySF &&
      this.nutritionalData.vitaminALastReceived &&
      this.nutritionalData.ironReceived &&
      this.nutritionalData.usingMNP &&
      this.nutritionalData.date &&
      this.nutritionalData.measurementMonth
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

  getSelectedChildMother() {
    const selectedChildName = this.nutritionalData.nameOfChild;

    const selectedChild = this.childRecords.find(
      (c) => c === selectedChildName
    );

    if (selectedChild) {
      this.nutritionalData.motherName = selectedChild.motherName;
      return selectedChild.motherName;
    } else {
      this.nutritionalData.motherName = '';
      return '';
    }
  }

  getSelectedChildFather() {
    const selectedChildName = this.nutritionalData.nameOfChild;

    const selectedChild = this.childRecords.find(
      (c) => c === selectedChildName
    );

    if (selectedChild) {
      this.nutritionalData.fatherName = selectedChild.fatherName;
      return selectedChild.fatherName;
    } else {
      this.nutritionalData.fatherName = '';
      return '';
    }
  }

  getSelectedChildBirthday() {
    const selectedChildName = this.nutritionalData.nameOfChild;

    const selectedChild = this.childRecords.find(
      (c) => c === selectedChildName
    );

    if (selectedChild) {
      this.nutritionalData.birthday = selectedChild.birthday;
      return selectedChild.birthday;
    } else {
      this.nutritionalData.birthday = '';
      return '';
    }
  }

  getSelectedChildAge() {
    const selectedChildName = this.nutritionalData.nameOfChild;

    const selectedChild = this.childRecords.find(
      (c) => c === selectedChildName
    );

    if (selectedChild) {
      this.nutritionalData.ageInMonths = selectedChild.ageInMonths;
      return selectedChild.ageInMonths;
    } else {
      this.nutritionalData.ageInMonths = '';
      return '';
    }
  }

  getSelectedChildBarangay() {
    const selectedChildName = this.nutritionalData.nameOfChild;

    const selectedChild = this.childRecords.find(
      (c) => c === selectedChildName
    );

    if (selectedChild) {
      this.nutritionalData.barangay = selectedChild.barangay;
      return selectedChild.barangay;
    } else {
      this.nutritionalData.barangay = '';
      return '';
    }
  }
}
