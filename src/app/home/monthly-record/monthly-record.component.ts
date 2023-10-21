import { Component } from '@angular/core';
import { Database, set, ref, get } from '@angular/fire/database';
import { Location } from '@angular/common';

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
  };

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
      this.monthlyHeightRecordData.barangay
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
    const selectedChild = this.monthlyHeightRecordData.nameOfChild;

    // Find the selected child in the childRecords array
    const child = this.childRecords.find((c) => c === selectedChild);

    // If a child is found, return its age
    return child ? child.age : '';
  }

  getSelectedChildBirthday() {
    const selectedChild = this.monthlyHeightRecordData.nameOfChild;

    // Find the selected child in the childRecords array
    const child = this.childRecords.find((c) => c === selectedChild);

    // If a child is found, return its birthday
    return child ? child.birthday : '';
  }

  getSelectedChildBarangay() {
    const selectedChild = this.monthlyHeightRecordData.nameOfChild;

    // Find the selected child in the childRecords array
    const child = this.childRecords.find((c) => c === selectedChild);

    // If a child is found, return its barangay
    return child ? child.barangay : '';
  }
}
