import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { Database, set, ref, get } from '@angular/fire/database';

@Component({
  selector: 'app-nutritional-status',
  templateUrl: './nutritional-status.component.html',
  styleUrls: ['./nutritional-status.component.css'],
})
export class NutritionalStatusComponent {
  childRecords: any[] = [];
  searchInput: string = '';
  filteredChildRecords: any[] = [];

  nutritionalData: any = {
    gender: '',
    nutritionalId: null,
    nameOfChild: '',
    fatherName: '',
    motherName: '',
    barangay: '',
    birthday: '',
    OPTPlus: '',
    age: '',
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
    Date: '',
    bmiData: '',
  };

  constructor(public database: Database, private location: Location) {
    this.fetchChildRecords();
  }

  onWeightForAgeChange() {
    this.calculateNutritionalStatus(
      this.nutritionalData.ageInMonths,
      this.nutritionalData.weight,
      this.nutritionalData.gender
    );
  }

  calculateNutritionalStatus(age: number, weight: number, gender: string) {
    if (gender === 'female') {
      if (age == 0) {
        if (weight <= 2.0) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 2.3) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 4.2) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 1) {
        if (weight <= 2.7) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 3.1) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 5.5) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 2) {
        if (weight <= 3.4) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 3.8) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 6.6) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 3) {
        if (weight <= 4.0) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 4.4) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 7.5) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 4) {
        if (weight <= 4.4) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 4.9) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 8.2) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 5) {
        if (weight <= 4.8) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 5.3) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 8.8) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 6) {
        if (weight <= 5.1) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 5.6) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 9.3) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 7) {
        if (weight <= 5.3) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 5.9) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 9.8) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 8) {
        if (weight <= 5.6) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 6.2) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 10.2) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 9) {
        if (weight <= 5.8) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 6.4) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 10.5) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 10) {
        if (weight <= 5.9) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 6.6) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 10.9) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 11) {
        if (weight <= 6.1) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 6.8) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 11.2) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 12) {
        if (weight <= 6.3) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 6.9) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 11.5) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 13) {
        if (weight <= 6.4) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 7.1) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 11.8) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 14) {
        if (weight <= 6.6) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 7.3) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 12.1) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 15) {
        if (weight <= 6.7) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 7.5) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 12.4) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 16) {
        if (weight <= 6.9) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 7.6) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 12.6) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 17) {
        if (weight <= 7.0) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 7.8) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 12.9) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 18) {
        if (weight <= 7.2) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 8.0) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 13.2) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 19) {
        if (weight <= 7.3) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 8.1) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 13.5) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 20) {
        if (weight <= 7.5) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 8.3) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 13.7) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 21) {
        if (weight <= 7.6) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 8.5) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 14.0) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 22) {
        if (weight <= 7.8) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 8.6) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 14.3) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 23) {
        if (weight <= 7.9) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 8.8) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 14.6) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 24) {
        if (weight <= 8.1) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 8.9) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 14.8) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 25) {
        if (weight <= 8.2) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 9.1) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 15.1) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 26) {
        if (weight <= 8.4) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 9.3) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 15.4) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 27) {
        if (weight <= 8.5) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 9.4) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 15.7) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 28) {
        if (weight <= 8.6) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 9.6) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 16.0) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 29) {
        if (weight <= 8.8) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 9.7) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 16.2) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 30) {
        if (weight <= 8.9) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 9.9) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 16.5) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 31) {
        if (weight <= 9.0) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 10.0) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 16.8) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 32) {
        if (weight <= 9.1) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 10.2) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 17.1) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 33) {
        if (weight <= 9.3) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 10.3) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 17.3) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 34) {
        if (weight <= 9.4) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 10.4) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 17.6) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 35) {
        if (weight <= 9.5) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 10.6) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 17.9) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 36) {
        if (weight <= 9.6) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 10.7) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 18.1) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 37) {
        if (weight <= 9.7) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 10.8) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 18.4) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 38) {
        if (weight <= 9.8) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 11.0) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 18.7) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 39) {
        if (weight <= 9.9) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 11.1) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 19.0) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 40) {
        if (weight <= 10.1) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 11.2) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 19.2) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 41) {
        if (weight <= 10.2) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 11.4) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 19.5) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 42) {
        if (weight <= 10.4) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 11.5) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 19.8) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 43) {
        if (weight <= 10.4) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 11.6) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 20.1) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 44) {
        if (weight <= 10.5) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 11.7) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 20.4) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 45) {
        if (weight <= 10.6) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 11.9) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 20.7) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 46) {
        if (weight <= 10.7) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 12.0) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 20.9) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 47) {
        if (weight <= 10.8) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 12.1) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 21.2) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 48) {
        if (weight <= 10.9) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 12.2) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 21.5) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 49) {
        if (weight <= 11.0) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 12.3) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 21.8) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 50) {
        if (weight <= 11.1) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 12.4) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 22.1) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 51) {
        if (weight <= 11.2) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 12.6) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 22.4) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 52) {
        if (weight <= 11.3) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 12.7) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 22.6) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 53) {
        if (weight <= 11.4) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 12.8) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 22.9) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 54) {
        if (weight <= 11.5) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 12.9) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 23.2) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 55) {
        if (weight <= 11.6) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 13.1) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 23.5) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 56) {
        if (weight <= 11.7) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 13.2) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 23.8) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 57) {
        if (weight <= 11.8) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 13.3) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 24.1) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 58) {
        if (weight <= 11.9) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 13.4) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 24.4) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 59) {
        if (weight <= 12.0) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 13.5) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 24.6) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 60) {
        if (weight <= 12.1) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 13.6) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 24.7) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 61) {
        if (weight <= 12.4) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 13.9) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 24.8) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 62) {
        if (weight <= 12.5) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 14.0) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 25.1) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 63) {
        if (weight <= 12.6) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 14.1) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 25.4) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 64) {
        if (weight <= 12.7) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 14.2) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 25.6) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 65) {
        if (weight <= 12.8) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 14.3) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 25.9) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 66) {
        if (weight <= 12.9) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 14.5) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 26.2) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 67) {
        if (weight <= 13.0) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 14.6) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 26.5) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 68) {
        if (weight <= 13.1) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 14.7) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 26.7) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 69) {
        if (weight <= 13.2) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 14.8) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 27.0) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 70) {
        if (weight <= 13.3) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 14.9) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 27.3) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 71) {
        if (weight <= 13.4) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 15.1) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 27.6) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else {
        this.nutritionalData.weightForAge = 'Unknown';
      }
    } else {
      if (age == 0) {
        if (weight <= 2.1) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 2.4) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 4.4) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 1) {
        if (weight <= 2.9) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 3.3) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 5.8) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 2) {
        if (weight <= 3.8) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 4.2) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 7.1) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 3) {
        if (weight <= 4.4) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 4.9) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 8.0) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 4) {
        if (weight <= 4.9) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 5.5) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 8.7) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 5) {
        if (weight <= 5.3) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 5.9) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 9.3) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 6) {
        if (weight <= 5.7) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 6.3) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 9.8) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 7) {
        if (weight <= 5.9) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 6.6) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 10.3) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 8) {
        if (weight <= 6.2) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 6.8) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 10.7) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 9) {
        if (weight <= 6.4) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 7.0) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 11.0) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 10) {
        if (weight <= 6.6) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 7.3) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 11.4) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 11) {
        if (weight <= 6.8) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 7.5) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 11.7) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 12) {
        if (weight <= 6.9) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 7.6) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 12.0) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 13) {
        if (weight <= 7.1) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 7.8) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 12.3) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 14) {
        if (weight <= 7.2) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 8.0) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 12.6) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 15) {
        if (weight <= 7.4) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 8.2) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 12.8) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 16) {
        if (weight <= 7.5) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 8.3) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 13.1) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 17) {
        if (weight <= 7.7) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 8.5) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 13.4) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 18) {
        if (weight <= 7.8) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 8.7) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 13.7) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 19) {
        if (weight <= 8.0) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 8.8) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 13.9) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 20) {
        if (weight <= 8.1) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 9.0) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 14.2) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 21) {
        if (weight <= 8.2) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 9.1) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 14.5) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 22) {
        if (weight <= 8.4) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 9.3) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 14.7) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 23) {
        if (weight <= 8.5) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 9.4) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 15.0) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 24) {
        if (weight <= 8.6) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 9.6) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 15.3) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 25) {
        if (weight <= 8.8) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 9.7) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 15.5) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 26) {
        if (weight <= 8.9) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 9.9) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 15.8) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 27) {
        if (weight <= 9.0) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 10.0) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 16.1) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 28) {
        if (weight <= 9.1) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 10.1) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 16.3) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 29) {
        if (weight <= 9.2) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 10.3) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 16.6) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 30) {
        if (weight <= 9.4) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 10.4) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 16.9) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 31) {
        if (weight <= 9.5) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 10.6) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 17.1) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 32) {
        if (weight <= 9.6) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 10.7) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 17.4) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 33) {
        if (weight <= 9.7) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 10.8) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 17.6) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 34) {
        if (weight <= 9.8) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 10.9) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 17.8) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 35) {
        if (weight <= 9.9) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 11.1) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 18.1) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 36) {
        if (weight <= 10.0) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 11.2) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 18.3) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 37) {
        if (weight <= 10.1) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 11.3) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 18.6) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 38) {
        if (weight <= 10.2) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 11.4) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 18.8) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 39) {
        if (weight <= 10.3) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 11.5) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 19.0) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 40) {
        if (weight <= 10.4) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 11.7) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 19.3) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 41) {
        if (weight <= 10.5) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 11.8) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 19.5) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 42) {
        if (weight <= 10.6) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 11.9) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 19.7) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 43) {
        if (weight <= 10.7) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 12.0) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 20.0) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 44) {
        if (weight <= 10.8) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 12.1) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 20.2) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 45) {
        if (weight <= 10.9) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 12.3) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 20.5) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 46) {
        if (weight <= 11.0) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 12.4) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 20.7) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 47) {
        if (weight <= 11.1) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 12.5) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 20.9) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 48) {
        if (weight <= 11.2) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 12.6) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 21.2) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 49) {
        if (weight <= 11.3) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 12.7) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 21.4) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 50) {
        if (weight <= 11.4) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 12.8) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 21.7) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 51) {
        if (weight <= 11.5) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 13.0) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 21.9) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 52) {
        if (weight <= 11.6) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 13.1) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 22.2) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 53) {
        if (weight <= 11.7) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 13.2) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 22.4) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 54) {
        if (weight <= 11.8) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 13.3) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 22.7) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 55) {
        if (weight <= 11.9) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 13.4) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 22.9) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 56) {
        if (weight <= 12.0) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 13.5) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 23.2) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 57) {
        if (weight <= 12.1) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 13.6) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 23.4) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 58) {
        if (weight <= 12.2) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 13.7) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 23.7) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 59) {
        if (weight <= 12.3) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 13.9) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 23.9) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 60) {
        if (weight <= 12.4) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 14.0) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 24.2) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 61) {
        if (weight <= 12.7) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 14.3) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 24.3) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 62) {
        if (weight <= 12.8) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 14.4) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 24.4) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 63) {
        if (weight <= 13.0) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 14.5) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 24.7) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 64) {
        if (weight <= 13.1) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 14.7) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 24.9) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 65) {
        if (weight <= 13.2) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 14.8) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 25.2) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 66) {
        if (weight <= 13.3) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 14.9) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 25.5) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 67) {
        if (weight <= 13.4) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 15.1) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 25.7) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 68) {
        if (weight <= 13.6) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 15.2) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 26.0) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 69) {
        if (weight <= 13.7) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 15.3) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 26.3) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 70) {
        if (weight <= 13.8) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 15.5) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 26.6) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      } else if (age == 71) {
        if (weight <= 13.9) {
          this.nutritionalData.weightForAge = 'SUW';
        } else if (weight <= 15.6) {
          this.nutritionalData.weightForAge = 'UW';
        } else if (weight <= 26.8) {
          this.nutritionalData.weightForAge = 'N';
        } else {
          this.nutritionalData.weightForAge = 'OW';
        }
      }
    }
  }

  onHeightForAgeChange() {
    this.calculateHeightForAge(
      this.nutritionalData.ageInMonths,
      this.nutritionalData.height,
      this.nutritionalData.gender
    );
  }

  calculateHeightForAge(age: number, height: number, gender: string) {
    if (gender === 'female') {
      if (age == 0) {
        if (height <= 43.5) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 45.3) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 52.9) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 1) {
        if (height <= 47.7) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 49.7) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 57.6) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 2) {
        if (height <= 50.9) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 52.9) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 61.1) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 3) {
        if (height <= 53.4) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 55.5) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 64.0) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 4) {
        if (height <= 55.5) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 57.7) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 66.4) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 5) {
        if (height <= 57.3) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 59.5) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 68.5) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 6) {
        if (height <= 58.8) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 61.1) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 70.3) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 7) {
        if (height <= 60.2) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 62.6) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 71.9) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 8) {
        if (height <= 61.6) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 63.9) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 73.5) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 9) {
        if (height <= 62.8) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 65.2) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 75.0) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 10) {
        if (height <= 64.0) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 66.4) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 76.4) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 11) {
        if (height <= 65.1) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 67.6) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 77.8) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 12) {
        if (height <= 66.2) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 68.8) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 79.2) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 13) {
        if (height <= 67.2) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 69.9) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 80.5) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 14) {
        if (height <= 68.2) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 70.9) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 81.7) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 15) {
        if (height <= 69.2) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 71.9) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 83.0) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 16) {
        if (height <= 70.1) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 72.9) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 84.2) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 17) {
        if (height <= 71.0) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 73.9) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 85.4) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 18) {
        if (height <= 71.9) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 74.8) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 86.5) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 19) {
        if (height <= 72.7) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 75.7) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 87.6) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 20) {
        if (height <= 73.6) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 76.6) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 88.7) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 21) {
        if (height <= 74.4) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 77.4) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 89.8) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 22) {
        if (height <= 75.1) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 78.3) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 90.8) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 23) {
        if (height <= 75.9) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 79.1) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 91.9) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 24) {
        if (height <= 75.9) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 79.2) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 92.2) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 25) {
        if (height <= 76.7) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 79.9) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 93.1) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 26) {
        if (height <= 77.4) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 80.7) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 94.1) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 27) {
        if (height <= 78.0) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 81.4) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 95.0) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 28) {
        if (height <= 78.7) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 82.1) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 96.0) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 29) {
        if (height <= 79.4) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 82.8) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 96.9) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 30) {
        if (height <= 80.0) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 83.5) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 97.7) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 31) {
        if (height <= 80.6) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 84.2) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 98.6) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 32) {
        if (height <= 81.2) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 84.8) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 99.4) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 33) {
        if (height <= 81.8) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 85.5) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 100.3) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 34) {
        if (height <= 82.4) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 86.1) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 101.1) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 35) {
        if (height <= 83.0) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 86.7) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 101.9) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 36) {
        if (height <= 83.5) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 87.3) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 102.7) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 37) {
        if (height <= 84.1) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 87.9) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 103.4) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 38) {
        if (height <= 84.6) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 88.5) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 104.2) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 39) {
        if (height <= 85.2) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 89.1) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 105.0) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 40) {
        if (height <= 85.7) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 89.7) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 105.7) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 41) {
        if (height <= 86.2) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 90.3) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 106.4) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 42) {
        if (height <= 86.7) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 90.8) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 107.2) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 43) {
        if (height <= 87.3) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 91.4) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 107.9) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 44) {
        if (height <= 87.8) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 91.9) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 108.6) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 45) {
        if (height <= 88.3) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 92.4) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 109.3) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 46) {
        if (height <= 88.8) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 93.0) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 110.0) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 47) {
        if (height <= 89.2) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 93.5) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 110.7) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 48) {
        if (height <= 89.7) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 94.0) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 111.3) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 49) {
        if (height <= 90.2) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 94.5) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 112.0) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 50) {
        if (height <= 90.6) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 95.0) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 112.7) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 51) {
        if (height <= 91.1) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 95.5) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 113.3) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 52) {
        if (height <= 91.6) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 96.0) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 114.0) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 53) {
        if (height <= 92.0) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 96.5) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 114.6) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 54) {
        if (height <= 92.5) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 97.0) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 115.2) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 55) {
        if (height <= 92.9) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 97.5) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 115.9) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 56) {
        if (height <= 93.3) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 98.0) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 116.5) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 57) {
        if (height <= 93.8) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 98.4) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 117.1) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 58) {
        if (height <= 94.2) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 98.9) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 117.7) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 59) {
        if (height <= 94.6) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 99.4) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 118.3) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 60) {
        if (height <= 95.1) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 99.8) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 118.9) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 61) {
        if (height <= 95.2) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 100.0) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 119.1) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 62) {
        if (height <= 95.6) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 100.4) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 119.7) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 63) {
        if (height <= 96.0) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 100.9) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 120.3) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 64) {
        if (height <= 96.4) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 101.3) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 120.9) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 65) {
        if (height <= 96.9) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 101.8) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 121.5) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 66) {
        if (height <= 97.3) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 102.2) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 122.0) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 67) {
        if (height <= 97.7) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 102.6) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 122.6) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 68) {
        if (height <= 98.1) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 103.1) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 123.2) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 69) {
        if (height <= 98.5) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 103.5) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 123.7) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 70) {
        if (height <= 98.9) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 103.9) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 124.3) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 71) {
        if (height <= 99.3) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 104.4) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 124.8) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else {
        this.nutritionalData.heightForAge = 'Unknown';
      }
    } else {
      if (age == 0) {
        if (height <= 44.1) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 46.0) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 53.7) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 1) {
        if (height <= 48.8) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 50.7) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 58.6) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 2) {
        if (height <= 52.3) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 54.3) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 62.4) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 3) {
        if (height <= 55.2) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 57.2) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 65.5) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 4) {
        if (height <= 57.5) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 59.6) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 68.0) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 5) {
        if (height <= 59.5) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 61.6) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 70.1) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 6) {
        if (height <= 61.1) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 63.2) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 71.9) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 7) {
        if (height <= 62.6) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 64.7) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 73.5) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 8) {
        if (height <= 63.9) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 66.1) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 75.0) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 9) {
        if (height <= 65.1) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 67.4) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 76.5) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 10) {
        if (height <= 66.3) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 68.6) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 77.9) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 11) {
        if (height <= 67.5) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 69.8) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 79.2) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 12) {
        if (height <= 68.5) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 70.9) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 80.5) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 13) {
        if (height <= 69.5) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 72.0) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 81.8) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 14) {
        if (height <= 70.5) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 73.0) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 83.0) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 15) {
        if (height <= 71.5) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 74.0) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 84.2) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 16) {
        if (height <= 72.4) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 74.9) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 85.4) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 17) {
        if (height <= 73.2) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 75.9) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 86.5) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 18) {
        if (height <= 74.1) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 76.8) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 87.7) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 19) {
        if (height <= 74.9) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 77.6) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 88.8) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 20) {
        if (height <= 75.7) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 78.5) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 89.8) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 21) {
        if (height <= 76.4) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 79.3) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 90.9) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 22) {
        if (height <= 77.1) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 80.1) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 91.9) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 23) {
        if (height <= 77.9) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 80.9) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 93.2) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 24) {
        if (height <= 77.9) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 80.9) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 92.2) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 25) {
        if (height <= 78.5) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 81.6) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 94.2) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 26) {
        if (height <= 79.2) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 82.4) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 95.2) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 27) {
        if (height <= 79.8) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 83.0) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 96.1) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 28) {
        if (height <= 80.4) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 83.7) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 97.0) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 29) {
        if (height <= 81.0) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 84.4) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 97.9) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 30) {
        if (height <= 81.6) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 85.0) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 98.7) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 31) {
        if (height <= 83.2) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 85.6) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 99.6) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 32) {
        if (height <= 82.7) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 86.3) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 100.4) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 33) {
        if (height <= 83.3) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 86.8) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 101.2) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 34) {
        if (height <= 83.8) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 87.4) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 102.0) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 35) {
        if (height <= 84.3) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 88.0) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 102.7) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 36) {
        if (height <= 84.9) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 88.6) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 103.5) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 37) {
        if (height <= 85.4) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 89.1) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 104.2) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 38) {
        if (height <= 85.9) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 89.7) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 105.0) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 39) {
        if (height <= 86.4) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 90.2) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 105.7) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 40) {
        if (height <= 86.9) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 90.8) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 106.4) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 41) {
        if (height <= 87.4) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 91.3) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 107.1) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 42) {
        if (height <= 87.9) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 91.8) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 107.8) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 43) {
        if (height <= 88.3) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 92.3) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 108.5) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 44) {
        if (height <= 88.8) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 92.9) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 109.1) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 45) {
        if (height <= 89.3) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 93.4) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 109.8) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 46) {
        if (height <= 89.7) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 93.9) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 110.4) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 47) {
        if (height <= 90.2) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 94.3) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 111.1) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 48) {
        if (height <= 90.6) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 94.8) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 111.7) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 49) {
        if (height <= 91.1) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 95.3) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 112.4) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 50) {
        if (height <= 91.5) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 95.8) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 113.0) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 51) {
        if (height <= 92.0) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 96.3) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 113.6) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 52) {
        if (height <= 92.4) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 96.8) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 114.2) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 53) {
        if (height <= 92.9) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 97.3) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 114.9) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 54) {
        if (height <= 93.3) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 97.7) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 115.5) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 55) {
        if (height <= 93.8) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 98.2) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 116.1) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 56) {
        if (height <= 94.2) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 98.7) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 116.7) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 57) {
        if (height <= 94.6) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 99.2) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 117.4) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 58) {
        if (height <= 95.1) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 99.6) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 118.0) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 59) {
        if (height <= 95.5) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 100.1) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 118.6) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 60) {
        if (height <= 96.0) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 100.6) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 119.2) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 61) {
        if (height <= 96.4) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 101.0) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 119.4) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 62) {
        if (height <= 96.8) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 101.1) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 120.0) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 63) {
        if (height <= 97.3) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 101.9) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 120.6) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 64) {
        if (height <= 97.7) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 102.4) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 121.2) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 65) {
        if (height <= 98.1) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 102.9) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 121.8) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 66) {
        if (height <= 98.6) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 103.3) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 122.4) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 67) {
        if (height <= 99.0) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 103.8) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 123.0) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 68) {
        if (height <= 99.4) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 104.2) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 123.6) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 69) {
        if (height <= 99.8) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 104.7) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 124.1) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 70) {
        if (height <= 100.3) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 105.1) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 124.7) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      } else if (age == 71) {
        if (height <= 100.7) {
          this.nutritionalData.heightForAge = 'SSt';
        } else if (height <= 105.6) {
          this.nutritionalData.heightForAge = 'St';
        } else if (height <= 125.2) {
          this.nutritionalData.heightForAge = 'N';
        } else {
          this.nutritionalData.heightForAge = 'T';
        }
      }
    }
  }

  onBirthdayChange() {
    this.calculateAge(this.nutritionalData.birthday);
    this.calculateAgeInMonths(this.nutritionalData.birthday);
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

    this.nutritionalData.age = age.toString();
  }

  calculateAgeInMonths(birthdate: string) {
    const today = new Date();
    const birthDate = new Date(birthdate);
    const years = today.getFullYear() - birthDate.getFullYear();
    const months = today.getMonth() - birthDate.getMonth();
    const ageInMonths = years * 12 + months;

    // Set ageInMonths to zero if it's negative
    if (ageInMonths < 0) {
      this.nutritionalData.ageInMonths = '0';
    } else {
      this.nutritionalData.ageInMonths = ageInMonths.toString();
    }
  }

  onSubmit() {
    this.nutritionalData.Date = Date.now();
    if (this.isValidnutritionalData()) {
      // Query the latest nutritional ID from the NutritionalRecord
      const latestnutritionalIdRef = ref(this.database, 'NutritionalRecord');
      get(latestnutritionalIdRef).then((snapshot) => {
        let nutritionalId = '10001';

        // Initialize with '1'

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
            alert('Error adding Records: ' + error);
          });
      });
    } else {
      alert('Invalid Records data');
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
      age: '',
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
      Date: '',
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
      (this.nutritionalData.age || this.nutritionalData.age === 0) &&
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
      this.nutritionalData.Date
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
    this.nutritionalData.nameOfChild = this.searchInput;

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
      (c) => c.firstName + ' ' + c.lastName === selectedChildName
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
      (c) => c.firstName + ' ' + c.lastName === selectedChildName
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
      (c) => c.firstName + ' ' + c.lastName === selectedChildName
    );

    if (selectedChild) {
      // Update the monthlyHeightRecordData's birthday
      this.nutritionalData.birthday = selectedChild.birthday;

      // Calculate age based on selected child's birthday
      this.calculateAge(this.nutritionalData.birthday);
      this.calculateAgeInMonths(this.nutritionalData.birthday);

      // Return the selected child's birthday
      return selectedChild.birthday;
    } else {
      // Clear the birthday field if the selected child is not found
      this.nutritionalData.birthday = '';
      return '';
    }
  }

  getSelectedChildBarangay() {
    const selectedChildName = this.nutritionalData.nameOfChild;

    const selectedChild = this.childRecords.find(
      (c) => c.firstName + ' ' + c.lastName === selectedChildName
    );

    if (selectedChild) {
      this.getSelectedChildGender();
      this.nutritionalData.barangay = selectedChild.barangay;
      return selectedChild.barangay;
    } else {
      this.nutritionalData.barangay = '';
      return '';
    }
  }

  getSelectedChildGender() {
    const selectedChildName = this.nutritionalData.nameOfChild;

    const selectedChild = this.childRecords.find(
      (c) => c.firstName + ' ' + c.lastName === selectedChildName
    );

    if (selectedChild) {
      this.nutritionalData.gender = selectedChild.gender;
      return selectedChild.gender;
    } else {
      this.nutritionalData.gender = '';
      return '';
    }
  }

  calculateBMI() {
    const age = parseInt(this.nutritionalData.ageInMonths);
    const heightMeters = this.nutritionalData.height / 100; // Convert height to meters
    const weight = this.nutritionalData.weight;

    if (age > 72) {
      this.nutritionalData.weightForHeight = 'Age must be 72 months or below';
      return;
    }

    if (weight && heightMeters && age) {
      const bmi = weight / (heightMeters * heightMeters);

      this.nutritionalData.bmiData = bmi;

      if (bmi >= 30) {
        this.nutritionalData.weightForHeight = 'Ob';
      } else if (bmi >= 25) {
        this.nutritionalData.weightForHeight = 'OW';
      } else if (bmi >= 14.1) {
        this.nutritionalData.weightForHeight = 'N';
      } else if (bmi >= 8) {
        this.nutritionalData.weightForHeight = 'UW';
      } else {
        this.nutritionalData.weightForHeight = 'SUW';
      }
    } else {
      this.nutritionalData.weightForHeight = ''; // Reset status if data is incomplete
    }
  }
}
