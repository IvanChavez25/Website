import { Component } from '@angular/core';
import { Database, set, ref, get } from '@angular/fire/database';
import { Location } from '@angular/common';

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
    ageInMonth: '',
    weight: '',
    heightOrLength: '',
    weightForLengthOrHeight: '',
    weightForAge: '',
    heightOrLengths: '',
    weightForLengthorHeight: '',
    barangay: '',
  };

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
      ageInMonth: '',
      weight: '',
      heightOrLength: '',
      weightForLengthOrHeight: '',
      weightForAge: '',
      heightOrLengths: '',
      weightForLengthorHeight: '',
      barangay: '',
    };
  }

  private isValidmonthlyInfantRecordData(): boolean {
    return (
      this.monthlyInfantRecordData.nameOfChild &&
      this.monthlyInfantRecordData.birthday &&
      this.monthlyInfantRecordData.ageInMonth &&
      this.monthlyInfantRecordData.weight &&
      this.monthlyInfantRecordData.heightOrLength &&
      this.monthlyInfantRecordData.weightForLengthOrHeight &&
      this.monthlyInfantRecordData.weightForAge &&
      this.monthlyInfantRecordData.heightOrLengths &&
      this.monthlyInfantRecordData.weightForLengthorHeight &&
      this.monthlyInfantRecordData.barangay
    );
  }

  fetchChildRecords() {
    const childRef = ref(this.database, 'ChildRecord');

    get(childRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.childRecords = Object.values(snapshot.val());
        } else {
          this.childRecords = [];
        }
      })
      .catch((error) => {
        console.error('Error retrieving records:', error);
      });
  }

  getSelectedChildAge() {
    const selectedChild = this.monthlyInfantRecordData.nameOfChild;

    // Find the selected child in the childRecords array
    const child = this.childRecords.find((c) => c === selectedChild);

    // If a child is found, return its age
    return child ? child.age : '';
  }

  getSelectedChildBirthday() {
    const selectedChild = this.monthlyInfantRecordData.nameOfChild;

    // Find the selected child in the childRecords array
    const child = this.childRecords.find((c) => c === selectedChild);

    // If a child is found, return its birthday
    return child ? child.birthday : '';
  }

  getSelectedChildBarangay() {
    const selectedChild = this.monthlyInfantRecordData.nameOfChild;

    // Find the selected child in the childRecords array
    const child = this.childRecords.find((c) => c === selectedChild);

    // If a child is found, return its barangay
    return child ? child.barangay : '';
  }
}
