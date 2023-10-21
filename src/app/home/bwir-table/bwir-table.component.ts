import { Component } from '@angular/core';
import { Database, ref, get, update, remove } from '@angular/fire/database';
import { Location } from '@angular/common';

@Component({
  selector: 'app-bwir-table',
  templateUrl: './bwir-table.component.html',
  styleUrls: ['./bwir-table.component.css']
})
export class BWIRTableComponent {
  baselineRecords: any[] = [];
  baselineData: any = {};
 
  constructor(public database: Database, private location: Location) {
    this.fetchBaselineRecords();
  }

  fetchBaselineRecords() {

    const baselineRef = ref(this.database, 'BaselineRecord');


    get(baselineRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.baselineRecords = Object.values(snapshot.val());
        } else { 
          this.baselineRecords = [];
        }
      })
      .catch((error) => {
        console.error('Error retrieving baselineRecords:', error);
      });
  }
}
