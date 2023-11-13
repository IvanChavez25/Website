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

  onWeightForAgeChange() {
    this.calculateNutritionalStatus(
      this.monthlyInfantRecordData.ageInMonths,
      this.monthlyInfantRecordData.weight
    );
  }

  calculateNutritionalStatus(age: number, weight: number) {
    if (age == 0) {
      if (weight <= 2.0) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 2.3) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 4.2) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 1) {
      if (weight <= 2.7) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 3.1) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 5.5) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 2) {
      if (weight <= 3.4) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 3.8) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 6.6) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 3) {
      if (weight <= 4.0) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 4.4) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 7.5) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 4) {
      if (weight <= 4.4) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 4.9) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 8.2) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 5) {
      if (weight <= 4.8) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 5.3) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 8.8) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 6) {
      if (weight <= 5.1) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 5.6) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 9.3) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 7) {
      if (weight <= 5.3) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 5.9) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 9.8) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 8) {
      if (weight <= 5.6) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 6.2) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 10.2) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 9) {
      if (weight <= 5.8) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 6.4) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 10.5) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 10) {
      if (weight <= 5.9) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 6.6) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 10.9) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 11) {
      if (weight <= 6.1) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 6.8) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 11.2) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 12) {
      if (weight <= 6.3) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 6.9) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 11.5) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 13) {
      if (weight <= 6.4) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 7.1) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 11.8) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 14) {
      if (weight <= 6.6) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 7.3) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 12.1) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 15) {
      if (weight <= 6.7) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 7.5) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 12.4) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 16) {
      if (weight <= 6.9) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 7.6) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 12.6) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 17) {
      if (weight <= 7.0) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 7.8) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 12.9) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 18) {
      if (weight <= 7.2) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 8.0) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 13.2) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 19) {
      if (weight <= 7.3) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 8.1) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 13.5) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 20) {
      if (weight <= 7.5) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 8.3) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 13.7) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 21) {
      if (weight <= 7.6) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 8.5) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 14.0) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 22) {
      if (weight <= 7.8) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 8.6) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 14.3) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 23) {
      if (weight <= 7.9) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 8.8) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 14.6) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 24) {
      if (weight <= 8.1) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 8.9) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 14.8) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 25) {
      if (weight <= 8.2) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 9.1) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 15.1) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 26) {
      if (weight <= 8.4) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 9.3) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 15.4) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 27) {
      if (weight <= 8.5) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 9.4) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 15.7) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 28) {
      if (weight <= 8.6) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 9.6) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 16.0) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 29) {
      if (weight <= 8.8) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 9.7) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 16.2) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 30) {
      if (weight <= 8.9) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 9.9) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 16.5) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 31) {
      if (weight <= 9.0) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 10.0) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 16.8) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 32) {
      if (weight <= 9.1) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 10.2) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 17.1) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 33) {
      if (weight <= 9.3) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 10.3) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 17.3) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 34) {
      if (weight <= 9.4) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 10.4) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 17.6) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 35) {
      if (weight <= 9.5) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 10.6) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 17.9) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 36) {
      if (weight <= 9.6) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 10.7) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 18.1) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 37) {
      if (weight <= 9.7) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 10.8) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 18.4) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 38) {
      if (weight <= 9.8) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 11.0) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 18.7) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 39) {
      if (weight <= 9.9) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 11.1) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 19.0) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 40) {
      if (weight <= 10.1) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 11.2) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 19.2) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 41) {
      if (weight <= 10.2) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 11.4) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 19.5) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 42) {
      if (weight <= 10.4) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 11.5) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 19.8) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 43) {
      if (weight <= 10.4) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 11.6) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 20.1) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 44) {
      if (weight <= 10.5) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 11.7) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 20.4) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 45) {
      if (weight <= 10.6) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 11.9) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 20.7) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 46) {
      if (weight <= 10.7) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 12.0) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 20.9) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 47) {
      if (weight <= 10.8) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 12.1) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 21.2) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 48) {
      if (weight <= 10.9) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 12.2) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 21.5) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 49) {
      if (weight <= 11.0) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 12.3) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 21.8) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 50) {
      if (weight <= 11.1) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 12.4) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 22.1) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 51) {
      if (weight <= 11.2) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 12.6) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 22.4) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 52) {
      if (weight <= 11.3) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 12.7) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 22.6) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 53) {
      if (weight <= 11.4) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 12.8) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 22.9) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 54) {
      if (weight <= 11.5) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 12.9) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 23.2) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 55) {
      if (weight <= 11.6) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 13.1) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 23.5) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 56) {
      if (weight <= 11.7) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 13.2) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 23.8) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 57) {
      if (weight <= 11.8) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 13.3) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 24.1) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 58) {
      if (weight <= 11.9) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 13.4) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 24.4) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 59) {
      if (weight <= 12.0) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 13.5) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 24.6) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 60) {
      if (weight <= 12.1) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 13.6) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 24.7) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 61) {
      if (weight <= 12.4) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 13.9) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 24.8) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 62) {
      if (weight <= 12.5) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 14.0) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 25.1) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 63) {
      if (weight <= 12.6) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 14.1) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 25.4) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 64) {
      if (weight <= 12.7) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 14.2) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 25.6) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 65) {
      if (weight <= 12.8) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 14.3) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 25.9) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 66) {
      if (weight <= 12.9) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 14.5) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 26.2) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 67) {
      if (weight <= 13.0) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 14.6) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 26.5) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 68) {
      if (weight <= 13.1) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 14.7) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 26.7) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 69) {
      if (weight <= 13.2) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 14.8) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 27.0) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 70) {
      if (weight <= 13.3) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 14.9) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 27.3) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else if (age == 71) {
      if (weight <= 13.4) {
        this.monthlyInfantRecordData.weightForAge = 'SUW';
      } else if (weight <= 15.1) {
        this.monthlyInfantRecordData.weightForAge = 'UW';
      } else if (weight <= 27.6) {
        this.monthlyInfantRecordData.weightForAge = 'N';
      } else {
        this.monthlyInfantRecordData.weightForAge = 'OW';
      }
    } else {
      this.monthlyInfantRecordData.weightForAge = 'Unknown';
    }
  }

  onheightOrLengthsChange() {
    this.calculateheightOrLengths(
      this.monthlyInfantRecordData.ageInMonths,
      this.monthlyInfantRecordData.height
    );
  }

  calculateheightOrLengths(age: number, height: number) {
    if (age == 0) {
      if (height <= 43.5) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 45.3) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 52.9) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 1) {
      if (height <= 47.7) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 49.7) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 57.6) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 2) {
      if (height <= 50.9) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 52.9) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 61.1) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 3) {
      if (height <= 53.4) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 55.5) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 64.0) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 4) {
      if (height <= 55.5) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 57.7) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 66.4) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 5) {
      if (height <= 57.3) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 59.5) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 68.5) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 6) {
      if (height <= 58.8) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 61.1) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 70.3) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 7) {
      if (height <= 60.2) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 62.6) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 71.9) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 8) {
      if (height <= 61.6) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 63.9) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 73.5) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 9) {
      if (height <= 62.8) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 65.2) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 75.0) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 10) {
      if (height <= 64.0) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 66.4) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 76.4) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 11) {
      if (height <= 65.1) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 67.6) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 77.8) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 12) {
      if (height <= 66.2) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 68.8) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 79.2) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 13) {
      if (height <= 67.2) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 69.9) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 80.5) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 14) {
      if (height <= 68.2) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 70.9) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 81.7) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 15) {
      if (height <= 69.2) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 71.9) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 83.0) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 16) {
      if (height <= 70.1) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 72.9) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 84.2) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 17) {
      if (height <= 71.0) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 73.9) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 85.4) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 18) {
      if (height <= 71.9) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 74.8) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 86.5) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 19) {
      if (height <= 72.7) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 75.7) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 87.6) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 20) {
      if (height <= 73.6) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 76.6) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 88.7) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 21) {
      if (height <= 74.4) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 77.4) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 89.8) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 22) {
      if (height <= 75.1) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 78.3) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 90.8) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 23) {
      if (height <= 75.9) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 79.1) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 91.9) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 24) {
      if (height <= 75.9) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 79.2) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 92.2) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 25) {
      if (height <= 76.7) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 79.9) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 93.1) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 26) {
      if (height <= 77.4) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 80.7) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 94.1) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 27) {
      if (height <= 78.0) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 81.4) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 95.0) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 28) {
      if (height <= 78.7) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 82.1) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 96.0) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 29) {
      if (height <= 79.4) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 82.8) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 96.9) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 30) {
      if (height <= 80.0) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 83.5) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 97.7) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 31) {
      if (height <= 80.6) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 84.2) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 98.6) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 32) {
      if (height <= 81.2) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 84.8) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 99.4) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 33) {
      if (height <= 81.8) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 85.5) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 100.3) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 34) {
      if (height <= 82.4) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 86.1) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 101.1) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 35) {
      if (height <= 83.0) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 86.7) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 101.9) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 36) {
      if (height <= 83.5) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 87.3) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 102.7) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 37) {
      if (height <= 84.1) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 87.9) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 103.4) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 38) {
      if (height <= 84.6) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 88.5) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 104.2) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 39) {
      if (height <= 85.2) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 89.1) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 105.0) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 40) {
      if (height <= 85.7) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 89.7) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 105.7) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 41) {
      if (height <= 86.2) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 90.3) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 106.4) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 42) {
      if (height <= 86.7) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 90.8) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 107.2) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 43) {
      if (height <= 87.3) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 91.4) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 107.9) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 44) {
      if (height <= 87.8) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 91.9) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 108.6) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 45) {
      if (height <= 88.3) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 92.4) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 109.3) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 46) {
      if (height <= 88.8) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 93.0) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 110.0) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 47) {
      if (height <= 89.2) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 93.5) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 110.7) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 48) {
      if (height <= 89.7) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 94.0) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 111.3) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 49) {
      if (height <= 90.2) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 94.5) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 112.0) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 50) {
      if (height <= 90.6) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 95.0) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 112.7) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 51) {
      if (height <= 91.1) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 95.5) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 113.3) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 52) {
      if (height <= 91.6) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 96.0) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 114.0) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 53) {
      if (height <= 92.0) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 96.5) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 114.6) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 54) {
      if (height <= 92.5) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 97.0) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 115.2) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 55) {
      if (height <= 92.9) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 97.5) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 115.9) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 56) {
      if (height <= 93.3) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 98.0) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 116.5) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 57) {
      if (height <= 93.8) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 98.4) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 117.1) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 58) {
      if (height <= 94.2) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 98.9) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 117.7) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 59) {
      if (height <= 94.6) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 99.4) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 118.3) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 60) {
      if (height <= 95.1) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 99.8) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 118.9) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 61) {
      if (height <= 95.2) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 100.0) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 119.1) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 62) {
      if (height <= 95.6) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 100.4) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 119.7) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 63) {
      if (height <= 96.0) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 100.9) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 120.3) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 64) {
      if (height <= 96.4) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 101.3) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 120.9) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 65) {
      if (height <= 96.9) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 101.8) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 121.5) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 66) {
      if (height <= 97.3) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 102.2) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 122.0) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 67) {
      if (height <= 97.7) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 102.6) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 122.6) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 68) {
      if (height <= 98.1) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 103.1) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 123.2) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 69) {
      if (height <= 98.5) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 103.5) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 123.7) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 70) {
      if (height <= 98.9) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 103.9) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 124.3) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else if (age == 71) {
      if (height <= 99.3) {
        this.monthlyInfantRecordData.heightOrLengths = 'SSt';
      } else if (height <= 104.4) {
        this.monthlyInfantRecordData.heightOrLengths = 'St';
      } else if (height <= 124.8) {
        this.monthlyInfantRecordData.heightOrLengths = 'N';
      } else {
        this.monthlyInfantRecordData.heightOrLengths = 'T';
      }
    } else {
      this.monthlyInfantRecordData.heightOrLengths = 'Unknown';
    }
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
