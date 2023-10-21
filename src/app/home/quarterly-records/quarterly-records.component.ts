import { Component } from '@angular/core';
import { Location } from '@angular/common';
import {
  Database,
  set,
  ref,
  get,
} from '@angular/fire/database';

@Component({
  selector: 'app-quarterly-records',
  templateUrl: './quarterly-records.component.html',
  styleUrls: ['./quarterly-records.component.css']
})
export class QuarterlyRecordsComponent {
    barangay: string = 'ABUNG';
    measurementMonth: string = 'January';
    weight: number = 0;
    heightOrLength: number = 0;
    weightForLengthOrHeight: number = 0;

    quarterlyData: any = {
      quarterlyId: null,
      nameOfChild: '',
      birthday: '',
      ageInMonth: '',
      weight: '',
      heightOrLength: '',
      weightForLengthOrHeight: '',
      nutritionalStatus: '',
      barangay: '',
      measurementMonth: '',

    };

    constructor(public database: Database) {}

  onSubmit() {
    if (this.isValidquarterlyData()) {
      // Query the latest child ID from the ChildProfile
      const latestChildIdRef = ref(this.database, 'QuarterlyTable');
      get(latestChildIdRef).then((snapshot) => {
        let quarterlyId = '101'; // Initialize with '10001'
        
        // If there are existing child records, find the latest ID
        if (snapshot.exists()) {
          const childRecords = snapshot.val();
          const latestId = Math.max(...Object.keys(childRecords).map(Number));
          quarterlyId = (latestId + 1).toString();
        }
        
        this.quarterlyData.childrenId = quarterlyId;
        
        // Add childData to ChildProfile
        set(ref(this.database, 'QuarterlyTable/' + quarterlyId), this.quarterlyData)
          .then(() => {
            alert('QuarterlyTable added successfully');
            this.clearForm();
          })
          .catch((error) => {
            alert('Error adding children: ' + error);
          });
      });
    } else {
      alert('Invalid child data');
      console.log(this.quarterlyData);
    }
  }

  private clearForm() {
    this.quarterlyData = {
      nameOfChild: '',
      birthday: '',
      ageInMonth: '',
      weight: '',
      heightOrLength: '',
      weightForLengthOrHeight: '',
      nutritionalStatus: '',
      barangay: '',
      measurementMonth: '',
    };
  }

  private isValidquarterlyData(): boolean {
    return (
      this.quarterlyData.nameOfChild &&
      this.quarterlyData.birthday &&
      this.quarterlyData.ageInMonth &&
      this.quarterlyData.weight &&
      this.quarterlyData.heightOrLength &&
      this.quarterlyData.weightForLengthOrHeight &&
      this.quarterlyData.nutritionalStatus &&
      this.quarterlyData.barangay &&
      this.quarterlyData.measurementMonth
    );
    
  }
}
