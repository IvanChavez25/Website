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
  selector: 'app-health-records',
  templateUrl: './health-records.component.html',
  styleUrls: ['./health-records.component.css'],
})
export class HealthRecordsComponent {
  childRecords: any[] = [];

  weightForAge: string = 'SUW';
  heightForAge: string = 'SSt';
  weightForHeight: string = 'SUW';

  healthRecordData: any = {
    healthRecordsId: null,
    childrenName: '',
    age: '',
    weight: '',
    height: '',
    vitamin: '',
    lastDateReceived: '',
    weightForAge: '',
    heightForAge: '',
    weightForHeight: '',
    date: '',
  };

  constructor(public database: Database, private location: Location) {
    this.fetchChildRecords();
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

  onSubmit() {
    if (this.isValidhealthRecordData()) {
      // Query the latest child ID from the HealthRecord
      const latesthealthRecordsIdRef = ref(this.database, 'HealthRecord');
      get(latesthealthRecordsIdRef).then((snapshot) => {
        let healthRecordsId = '10001'; // Initialize with '10001'

        // If there are existing health records, find the latest ID
        if (snapshot.exists()) {
          const healthRecord = snapshot.val();
          const latestId = Math.max(...Object.keys(healthRecord).map(Number));
          healthRecordsId = (latestId + 1).toString();
        }

        this.healthRecordData.healthRecordsId = healthRecordsId;

        // Add healthRecordData to HealthRecord
        set(
          ref(this.database, 'HealthRecord/' + healthRecordsId),
          this.healthRecordData
        )
          .then(() => {
            alert('HealthRecord added successfully');
            this.clearForm();
          })
          .catch((error) => {
            alert('Error adding health record: ' + error);
          });
      });
    } else {
      alert('Invalid health data');
      console.log(this.healthRecordData);
    }
  }

  private clearForm() {
    this.healthRecordData = {
      childrenName: '',
      age: '',
      weight: '',
      height: '',
      vitamin: '',
      lastDateReceived: '',
      weightForAge: '',
      heightForAge: '',
      weightForHeight: '',
      date: '',
    };
  }

  private isValidhealthRecordData(): boolean {
    return (
      this.healthRecordData.childrenName &&
      this.healthRecordData.age &&
      this.healthRecordData.weight &&
      this.healthRecordData.height &&
      this.healthRecordData.vitamin &&
      this.healthRecordData.lastDateReceived &&
      this.healthRecordData.weightForAge &&
      this.healthRecordData.heightForAge &&
      this.healthRecordData.weightForHeight &&
      this.healthRecordData.date
    );
  }

  getSelectedChildAge() {
    const selectedChild = this.healthRecordData.childrenName;

    // Find the selected child in the childRecords array
    const child = this.childRecords.find((c) => c === selectedChild);

    // If a child is found, return its age
    return child ? child.age : '';
  }
}
