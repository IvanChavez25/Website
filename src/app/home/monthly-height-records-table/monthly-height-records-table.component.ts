import { Component } from '@angular/core';
import { Database, ref, get, update, remove } from '@angular/fire/database';
import { Location } from '@angular/common';

@Component({
  selector: 'app-monthly-height-records-table',
  templateUrl: './monthly-height-records-table.component.html',
  styleUrls: ['./monthly-height-records-table.component.css']
})
export class MonthlyHeightRecordsTableComponent {
  monthlyHeightRecords: any[] = [];
  monthlyHeightRecordsData: any = {};
 
  constructor(public database: Database, private location: Location) {
    this.fetchmonthlyHeightRecords();
  }

  fetchmonthlyHeightRecords() {

    const monthlyHeightRef = ref(this.database, 'MonthlyHeightRecord');


    get(monthlyHeightRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.monthlyHeightRecords = Object.values(snapshot.val());
        } else {
          this.monthlyHeightRecords = [];
        }
      })
      .catch((error) => {
        console.error('Error retrieving monthlyHeightRecords:', error);
      });
  }
}

