import { Component } from '@angular/core';
import { Location } from '@angular/common';

import {
  Database,
  set,
  ref,
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
    this.calculateNutritionalStatus(
      this.monthlyWeightRecordData.ageInMonths,
      this.monthlyWeightRecordData.weight
    );
  }

  calculateNutritionalStatus(age: number, weight: number) {
    if (age == 0) {
      if (weight <= 2.0) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 2.3) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 4.2) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 1) {
      if (weight <= 2.7) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 3.1) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 5.5) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 2) {
      if (weight <= 3.4) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 3.8) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 6.6) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 3) {
      if (weight <= 4.0) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 4.4) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 7.5) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 4) {
      if (weight <= 4.4) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 4.9) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 8.2) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 5) {
      if (weight <= 4.8) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 5.3) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 8.8) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 6) {
      if (weight <= 5.1) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 5.6) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 9.3) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 7) {
      if (weight <= 5.3) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 5.9) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 9.8) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 8) {
      if (weight <= 5.6) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 6.2) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 10.2) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 9) {
      if (weight <= 5.8) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 6.4) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 10.5) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 10) {
      if (weight <= 5.9) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 6.6) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 10.9) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 11) {
      if (weight <= 6.1) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 6.8) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 11.2) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 12) {
      if (weight <= 6.3) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 6.9) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 11.5) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 13) {
      if (weight <= 6.4) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 7.1) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 11.8) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 14) {
      if (weight <= 6.6) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 7.3) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 12.1) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 15) {
      if (weight <= 6.7) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 7.5) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 12.4) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 16) {
      if (weight <= 6.9) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 7.6) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 12.6) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 17) {
      if (weight <= 7.0) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 7.8) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 12.9) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 18) {
      if (weight <= 7.2) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 8.0) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 13.2) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 19) {
      if (weight <= 7.3) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 8.1) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 13.5) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 20) {
      if (weight <= 7.5) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 8.3) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 13.7) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 21) {
      if (weight <= 7.6) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 8.5) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 14.0) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 22) {
      if (weight <= 7.8) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 8.6) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 14.3) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 23) {
      if (weight <= 7.9) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 8.8) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 14.6) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 24) {
      if (weight <= 8.1) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 8.9) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 14.8) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 25) {
      if (weight <= 8.2) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 9.1) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 15.1) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 26) {
      if (weight <= 8.4) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 9.3) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 15.4) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 27) {
      if (weight <= 8.5) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 9.4) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 15.7) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 28) {
      if (weight <= 8.6) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 9.6) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 16.0) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 29) {
      if (weight <= 8.8) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 9.7) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 16.2) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 30) {
      if (weight <= 8.9) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 9.9) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 16.5) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 31) {
      if (weight <= 9.0) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 10.0) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 16.8) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 32) {
      if (weight <= 9.1) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 10.2) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 17.1) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 33) {
      if (weight <= 9.3) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 10.3) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 17.3) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 34) {
      if (weight <= 9.4) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 10.4) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 17.6) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 35) {
      if (weight <= 9.5) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 10.6) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 17.9) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 36) {
      if (weight <= 9.6) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 10.7) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 18.1) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 37) {
      if (weight <= 9.7) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 10.8) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 18.4) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 38) {
      if (weight <= 9.8) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 11.0) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 18.7) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 39) {
      if (weight <= 9.9) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 11.1) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 19.0) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 40) {
      if (weight <= 10.1) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 11.2) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 19.2) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 41) {
      if (weight <= 10.2) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 11.4) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 19.5) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 42) {
      if (weight <= 10.4) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 11.5) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 19.8) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 43) {
      if (weight <= 10.4) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 11.6) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 20.1) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 44) {
      if (weight <= 10.5) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 11.7) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 20.4) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 45) {
      if (weight <= 10.6) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 11.9) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 20.7) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 46) {
      if (weight <= 10.7) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 12.0) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 20.9) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 47) {
      if (weight <= 10.8) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 12.1) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 21.2) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 48) {
      if (weight <= 10.9) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 12.2) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 21.5) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 49) {
      if (weight <= 11.0) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 12.3) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 21.8) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 50) {
      if (weight <= 11.1) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 12.4) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 22.1) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 51) {
      if (weight <= 11.2) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 12.6) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 22.4) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 52) {
      if (weight <= 11.3) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 12.7) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 22.6) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 53) {
      if (weight <= 11.4) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 12.8) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 22.9) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 54) {
      if (weight <= 11.5) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 12.9) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 23.2) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 55) {
      if (weight <= 11.6) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 13.1) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 23.5) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 56) {
      if (weight <= 11.7) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 13.2) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 23.8) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 57) {
      if (weight <= 11.8) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 13.3) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 24.1) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 58) {
      if (weight <= 11.9) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 13.4) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 24.4) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 59) {
      if (weight <= 12.0) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 13.5) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 24.6) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 60) {
      if (weight <= 12.1) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 13.6) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 24.7) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 61) {
      if (weight <= 12.4) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 13.9) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 24.8) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 62) {
      if (weight <= 12.5) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 14.0) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 25.1) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 63) {
      if (weight <= 12.6) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 14.1) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 25.4) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 64) {
      if (weight <= 12.7) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 14.2) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 25.6) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 65) {
      if (weight <= 12.8) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 14.3) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 25.9) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 66) {
      if (weight <= 12.9) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 14.5) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 26.2) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 67) {
      if (weight <= 13.0) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 14.6) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 26.5) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 68) {
      if (weight <= 13.1) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 14.7) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 26.7) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 69) {
      if (weight <= 13.2) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 14.8) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 27.0) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 70) {
      if (weight <= 13.3) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 14.9) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 27.3) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
        this.monthlyWeightRecordData.weightStatus = 'Overweight';
      }
    } else if (age == 71) {
      if (weight <= 13.4) {
        this.monthlyWeightRecordData.weightStatus = 'Severely Underweight';
      } else if (weight <= 15.1) {
        this.monthlyWeightRecordData.weightStatus = 'Underweight';
      } else if (weight <= 27.6) {
        this.monthlyWeightRecordData.weightStatus = 'Normal';
      } else {
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
