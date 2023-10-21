import { Component } from '@angular/core';
import { Database, set, ref, get } from '@angular/fire/database';
import { Location } from '@angular/common';

@Component({
  selector: 'app-monthly-weight',
  templateUrl: './monthly-weight.component.html',
  styleUrls: ['./monthly-weight.component.css'],
})
export class MonthlyWeightComponent {
  childRecords: any[] = [];

  weight: number = 0;

  monthlyWeightRecordData: any = {
    monthlyWeightRecordsId: null,
    nameOfChild: '',
    birthday: '',
    ageInMonth: '',
    weight: '',
    weightStatus: '',
    dateOfWeighing: '',
    barangay: '',
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
      ageInMonth: '',
      weight: '',
      weightStatus: '',
      dateOfWeighing: '',
      barangay: '',
    };
  }

  private isValidmonthlyWeightRecordData(): boolean {
    return (
      this.monthlyWeightRecordData.nameOfChild &&
      this.monthlyWeightRecordData.birthday &&
      this.monthlyWeightRecordData.ageInMonth &&
      this.monthlyWeightRecordData.weight &&
      this.monthlyWeightRecordData.weightStatus &&
      this.monthlyWeightRecordData.dateOfWeighing &&
      this.monthlyWeightRecordData.barangay
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
    const selectedChild = this.monthlyWeightRecordData.nameOfChild;

    // Find the selected child in the childRecords array
    const child = this.childRecords.find((c) => c === selectedChild);

    // If a child is found, return its age
    return child ? child.age : '';
  }

  getSelectedChildBirthday() {
    const selectedChild = this.monthlyWeightRecordData.nameOfChild;

    // Find the selected child in the childRecords array
    const child = this.childRecords.find((c) => c === selectedChild);

    // If a child is found, return its birthday
    return child ? child.birthday : '';
  }

  getSelectedChildBarangay() {
    const selectedChild = this.monthlyWeightRecordData.nameOfChild;

    // Find the selected child in the childRecords array
    const child = this.childRecords.find((c) => c === selectedChild);

    // If a child is found, return its barangay
    return child ? child.barangay : '';
  }
}
