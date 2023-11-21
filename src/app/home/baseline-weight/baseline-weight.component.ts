import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Database, set, ref, get } from '@angular/fire/database';

@Component({
  selector: 'app-baseline-weight',
  templateUrl: './baseline-weight.component.html',
  styleUrls: ['./baseline-weight.component.css'],
})
export class BaselineWeightComponent {
  childRecords: any[] = [];
  searchInput: string = '';
  filteredChildRecords: any[] = [];

  weight: number = 0;
  heightOrLength: number = 0;
  nbsDone: string = 'No';
  barangay: string = 'ABUNG';

  baselineData: any = {
    gender: '',
    HouseholdNumber: null,
    NameOfHouseholdHead: '',
    nameOfChild: '',
    birthday: '',
    bcgDate: '',
    dpt1Date: '',
    dpt2Date: '',
    dpt3Date: '',
    polio1Date: '',
    polio2Date: '',
    polio3Date: '',
    measlesDate: '',
    nbsDone: '',
    dateOfWeighing: '',
    ageInMonth: '',
    weight: '',
    weightStatus: '',
    barangay: '',
    Date: '',
  };

  constructor(public database: Database, private location: Location) {
    this.fetchChildRecords();
  }

  onWeightForAgeChange() {
    this.calculateNutritionalStatus(
      this.baselineData.ageInMonths,
      this.baselineData.weight,
      this.baselineData.gender
    );
  }

  calculateNutritionalStatus(age: number, weight: number, gender: string) {
    if (gender === 'female') {
      if (age == 0) {
        if (weight <= 2.0) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 2.3) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 4.2) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 1) {
        if (weight <= 2.7) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 3.1) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 5.5) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 2) {
        if (weight <= 3.4) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 3.8) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 6.6) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 3) {
        if (weight <= 4.0) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 4.4) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 7.5) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 4) {
        if (weight <= 4.4) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 4.9) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 8.2) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 5) {
        if (weight <= 4.8) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 5.3) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 8.8) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 6) {
        if (weight <= 5.1) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 5.6) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 9.3) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 7) {
        if (weight <= 5.3) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 5.9) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 9.8) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 8) {
        if (weight <= 5.6) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 6.2) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 10.2) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 9) {
        if (weight <= 5.8) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 6.4) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 10.5) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 10) {
        if (weight <= 5.9) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 6.6) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 10.9) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 11) {
        if (weight <= 6.1) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 6.8) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 11.2) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 12) {
        if (weight <= 6.3) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 6.9) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 11.5) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 13) {
        if (weight <= 6.4) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 7.1) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 11.8) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 14) {
        if (weight <= 6.6) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 7.3) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 12.1) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 15) {
        if (weight <= 6.7) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 7.5) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 12.4) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 16) {
        if (weight <= 6.9) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 7.6) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 12.6) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 17) {
        if (weight <= 7.0) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 7.8) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 12.9) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 18) {
        if (weight <= 7.2) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 8.0) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 13.2) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 19) {
        if (weight <= 7.3) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 8.1) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 13.5) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 20) {
        if (weight <= 7.5) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 8.3) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 13.7) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 21) {
        if (weight <= 7.6) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 8.5) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 14.0) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 22) {
        if (weight <= 7.8) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 8.6) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 14.3) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 23) {
        if (weight <= 7.9) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 8.8) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 14.6) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 24) {
        if (weight <= 8.1) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 8.9) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 14.8) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 25) {
        if (weight <= 8.2) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 9.1) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 15.1) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 26) {
        if (weight <= 8.4) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 9.3) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 15.4) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 27) {
        if (weight <= 8.5) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 9.4) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 15.7) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 28) {
        if (weight <= 8.6) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 9.6) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 16.0) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 29) {
        if (weight <= 8.8) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 9.7) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 16.2) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 30) {
        if (weight <= 8.9) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 9.9) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 16.5) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 31) {
        if (weight <= 9.0) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 10.0) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 16.8) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 32) {
        if (weight <= 9.1) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 10.2) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 17.1) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 33) {
        if (weight <= 9.3) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 10.3) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 17.3) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 34) {
        if (weight <= 9.4) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 10.4) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 17.6) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 35) {
        if (weight <= 9.5) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 10.6) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 17.9) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 36) {
        if (weight <= 9.6) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 10.7) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 18.1) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 37) {
        if (weight <= 9.7) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 10.8) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 18.4) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 38) {
        if (weight <= 9.8) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 11.0) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 18.7) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 39) {
        if (weight <= 9.9) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 11.1) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 19.0) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 40) {
        if (weight <= 10.1) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 11.2) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 19.2) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 41) {
        if (weight <= 10.2) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 11.4) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 19.5) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 42) {
        if (weight <= 10.4) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 11.5) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 19.8) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 43) {
        if (weight <= 10.4) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 11.6) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 20.1) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 44) {
        if (weight <= 10.5) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 11.7) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 20.4) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 45) {
        if (weight <= 10.6) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 11.9) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 20.7) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 46) {
        if (weight <= 10.7) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 12.0) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 20.9) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 47) {
        if (weight <= 10.8) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 12.1) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 21.2) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 48) {
        if (weight <= 10.9) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 12.2) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 21.5) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 49) {
        if (weight <= 11.0) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 12.3) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 21.8) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 50) {
        if (weight <= 11.1) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 12.4) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 22.1) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 51) {
        if (weight <= 11.2) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 12.6) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 22.4) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 52) {
        if (weight <= 11.3) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 12.7) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 22.6) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 53) {
        if (weight <= 11.4) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 12.8) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 22.9) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 54) {
        if (weight <= 11.5) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 12.9) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 23.2) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 55) {
        if (weight <= 11.6) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 13.1) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 23.5) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 56) {
        if (weight <= 11.7) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 13.2) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 23.8) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 57) {
        if (weight <= 11.8) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 13.3) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 24.1) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 58) {
        if (weight <= 11.9) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 13.4) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 24.4) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 59) {
        if (weight <= 12.0) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 13.5) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 24.6) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 60) {
        if (weight <= 12.1) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 13.6) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 24.7) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 61) {
        if (weight <= 12.4) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 13.9) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 24.8) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 62) {
        if (weight <= 12.5) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 14.0) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 25.1) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 63) {
        if (weight <= 12.6) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 14.1) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 25.4) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 64) {
        if (weight <= 12.7) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 14.2) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 25.6) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 65) {
        if (weight <= 12.8) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 14.3) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 25.9) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 66) {
        if (weight <= 12.9) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 14.5) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 26.2) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 67) {
        if (weight <= 13.0) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 14.6) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 26.5) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 68) {
        if (weight <= 13.1) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 14.7) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 26.7) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 69) {
        if (weight <= 13.2) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 14.8) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 27.0) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 70) {
        if (weight <= 13.3) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 14.9) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 27.3) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 71) {
        if (weight <= 13.4) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 15.1) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 27.6) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else {
        this.baselineData.weightForAge = 'Unknown';
      }
    } else {
      if (age == 0) {
        if (weight <= 2.1) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 2.4) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 4.4) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 1) {
        if (weight <= 2.9) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 3.3) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 5.8) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 2) {
        if (weight <= 3.8) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 4.2) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 7.1) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 3) {
        if (weight <= 4.4) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 4.9) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 8.0) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 4) {
        if (weight <= 4.9) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 5.5) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 8.7) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 5) {
        if (weight <= 5.3) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 5.9) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 9.3) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 6) {
        if (weight <= 5.7) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 6.3) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 9.8) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 7) {
        if (weight <= 5.9) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 6.6) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 10.3) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 8) {
        if (weight <= 6.2) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 6.8) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 10.7) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 9) {
        if (weight <= 6.4) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 7.0) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 11.0) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 10) {
        if (weight <= 6.6) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 7.3) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 11.4) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 11) {
        if (weight <= 6.8) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 7.5) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 11.7) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 12) {
        if (weight <= 6.9) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 7.6) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 12.0) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 13) {
        if (weight <= 7.1) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 7.8) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 12.3) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 14) {
        if (weight <= 7.2) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 8.0) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 12.6) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 15) {
        if (weight <= 7.4) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 8.2) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 12.8) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 16) {
        if (weight <= 7.5) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 8.3) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 13.1) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 17) {
        if (weight <= 7.7) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 8.5) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 13.4) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 18) {
        if (weight <= 7.8) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 8.7) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 13.7) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 19) {
        if (weight <= 8.0) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 8.8) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 13.9) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 20) {
        if (weight <= 8.1) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 9.0) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 14.2) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 21) {
        if (weight <= 8.2) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 9.1) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 14.5) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 22) {
        if (weight <= 8.4) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 9.3) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 14.7) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 23) {
        if (weight <= 8.5) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 9.4) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 15.0) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 24) {
        if (weight <= 8.6) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 9.6) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 15.3) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 25) {
        if (weight <= 8.8) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 9.7) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 15.5) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 26) {
        if (weight <= 8.9) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 9.9) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 15.8) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 27) {
        if (weight <= 9.0) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 10.0) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 16.1) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 28) {
        if (weight <= 9.1) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 10.1) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 16.3) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 29) {
        if (weight <= 9.2) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 10.3) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 16.6) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 30) {
        if (weight <= 9.4) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 10.4) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 16.9) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 31) {
        if (weight <= 9.5) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 10.6) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 17.1) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 32) {
        if (weight <= 9.6) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 10.7) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 17.4) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 33) {
        if (weight <= 9.7) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 10.8) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 17.6) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 34) {
        if (weight <= 9.8) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 10.9) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 17.8) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 35) {
        if (weight <= 9.9) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 11.1) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 18.1) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 36) {
        if (weight <= 10.0) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 11.2) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 18.3) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 37) {
        if (weight <= 10.1) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 11.3) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 18.6) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 38) {
        if (weight <= 10.2) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 11.4) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 18.8) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 39) {
        if (weight <= 10.3) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 11.5) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 19.0) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 40) {
        if (weight <= 10.4) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 11.7) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 19.3) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 41) {
        if (weight <= 10.5) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 11.8) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 19.5) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 42) {
        if (weight <= 10.6) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 11.9) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 19.7) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 43) {
        if (weight <= 10.7) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 12.0) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 20.0) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 44) {
        if (weight <= 10.8) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 12.1) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 20.2) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 45) {
        if (weight <= 10.9) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 12.3) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 20.5) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 46) {
        if (weight <= 11.0) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 12.4) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 20.7) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 47) {
        if (weight <= 11.1) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 12.5) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 20.9) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 48) {
        if (weight <= 11.2) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 12.6) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 21.2) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 49) {
        if (weight <= 11.3) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 12.7) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 21.4) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 50) {
        if (weight <= 11.4) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 12.8) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 21.7) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 51) {
        if (weight <= 11.5) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 13.0) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 21.9) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 52) {
        if (weight <= 11.6) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 13.1) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 22.2) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 53) {
        if (weight <= 11.7) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 13.2) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 22.4) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 54) {
        if (weight <= 11.8) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 13.3) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 22.7) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 55) {
        if (weight <= 11.9) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 13.4) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 22.9) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 56) {
        if (weight <= 12.0) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 13.5) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 23.2) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 57) {
        if (weight <= 12.1) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 13.6) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 23.4) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 58) {
        if (weight <= 12.2) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 13.7) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 23.7) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 59) {
        if (weight <= 12.3) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 13.9) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 23.9) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 60) {
        if (weight <= 12.4) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 14.0) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 24.2) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 61) {
        if (weight <= 12.7) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 14.3) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 24.3) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 62) {
        if (weight <= 12.8) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 14.4) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 24.4) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 63) {
        if (weight <= 13.0) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 14.5) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 24.7) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 64) {
        if (weight <= 13.1) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 14.7) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 24.9) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 65) {
        if (weight <= 13.2) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 14.8) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 25.2) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 66) {
        if (weight <= 13.3) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 14.9) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 25.5) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 67) {
        if (weight <= 13.4) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 15.1) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 25.7) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 68) {
        if (weight <= 13.6) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 15.2) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 26.0) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 69) {
        if (weight <= 13.7) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 15.3) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 26.3) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 70) {
        if (weight <= 13.8) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 15.5) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 26.6) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      } else if (age == 71) {
        if (weight <= 13.9) {
          this.baselineData.weightForAge = 'SUW';
        } else if (weight <= 15.6) {
          this.baselineData.weightForAge = 'UW';
        } else if (weight <= 26.8) {
          this.baselineData.weightForAge = 'N';
        } else {
          this.baselineData.weightForAge = 'OW';
        }
      }
    }
  }

  onSubmit() {
    this.baselineData.Date = Date.now();
    if (this.isValidbaselineData()) {
      // Query the latest child ID from the BaselineRecord
      const latestHouseholdNumberRef = ref(this.database, 'BaselineRecord');
      get(latestHouseholdNumberRef).then((snapshot) => {
        let HouseholdNumber = '10001'; // Initialize with '10001'

        // If there are existing baseline records, find the latest ID
        if (snapshot.exists()) {
          const baselineRecord = snapshot.val();
          const latestId = Math.max(...Object.keys(baselineRecord).map(Number));
          HouseholdNumber = (latestId + 1).toString();
        }

        this.baselineData.HouseholdNumber = HouseholdNumber;

        // Add baselineData to BaselineRecord
        set(
          ref(this.database, 'BaselineRecord/' + HouseholdNumber),
          this.baselineData
        )
          .then(() => {
            alert('BaselineRecord added successfully');
            this.clearForm();
          })
          .catch((error) => {
            alert('Error adding baseline record: ' + error);
          });
      });
    } else {
      alert('Invalid baseline data');
      console.log(this.baselineData);
    }
  }

  private clearForm() {
    this.baselineData = {
      HouseholdNumber: null,
      NameOfHouseholdHead: '',
      nameOfChild: '',
      birthday: '',
      bcgDate: '',
      dpt1Date: '',
      dpt2Date: '',
      dpt3Date: '',
      polio1Date: '',
      polio2Date: '',
      polio3Date: '',
      measlesDate: '',
      nbsDone: '',
      dateOfWeighing: '',
      ageInMonth: '',
      weight: '',
      weightStatus: '',
      barangay: '',
      Date: '',
    };
  }

  private isValidbaselineData(): boolean {
    return (
      (this.baselineData.NameOfHouseholdHead &&
        this.baselineData.nameOfChild &&
        this.baselineData.birthday &&
        this.baselineData.bcgDate) ||
      this.baselineData.dpt1Date ||
      this.baselineData.dpt2Date ||
      this.baselineData.dpt3Date ||
      this.baselineData.polio1Date ||
      this.baselineData.polio2Date ||
      this.baselineData.polio3Date ||
      this.baselineData.measlesDate ||
      (this.baselineData.nbsDone &&
        this.baselineData.dateOfWeighing &&
        this.baselineData.ageInMonth &&
        this.baselineData.weight &&
        this.baselineData.weightStatus &&
        this.baselineData.barangay &&
        this.baselineData.Date)
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
    this.baselineData.nameOfChild = this.searchInput;

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

  getSelectedChildBirthday() {
    const selectedChildName = this.baselineData.nameOfChild;

    const selectedChild = this.childRecords.find(
      (c) => c.firstName + ' ' + c.lastName === selectedChildName
    );

    if (selectedChild) {
      this.baselineData.birthday = selectedChild.birthday;
      return selectedChild.birthday;
    } else {
      this.baselineData.birthday = '';
      return '';
    }
  }

  getSelectedChildAge() {
    const selectedChildName = this.baselineData.nameOfChild;

    const selectedChild = this.childRecords.find(
      (c) => c.firstName + ' ' + c.lastName === selectedChildName
    );

    if (selectedChild) {
      this.baselineData.ageInMonths = selectedChild.ageInMonths;
      return selectedChild.ageInMonths;
    } else {
      this.baselineData.ageInMonths = '';
      return '';
    }
  }

  getSelectedChildBarangay() {
    const selectedChildName = this.baselineData.nameOfChild;

    const selectedChild = this.childRecords.find(
      (c) => c.firstName + ' ' + c.lastName === selectedChildName
    );

    if (selectedChild) {
      this.getSelectedChildGender();
      this.baselineData.barangay = selectedChild.barangay;
      return selectedChild.barangay;
    } else {
      this.baselineData.barangay = '';
      return '';
    }
  }

  getSelectedChildGender() {
    const selectedChildName = this.baselineData.nameOfChild;

    const selectedChild = this.childRecords.find(
      (c) => c.firstName + ' ' + c.lastName === selectedChildName
    );

    if (selectedChild) {
      this.baselineData.gender = selectedChild.gender;
      return selectedChild.gender;
    } else {
      this.baselineData.gender = '';
      return '';
    }
  }
}
