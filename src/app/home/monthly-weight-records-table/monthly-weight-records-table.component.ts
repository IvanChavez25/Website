import { Component } from '@angular/core';
import { Database, ref, get, update, remove } from '@angular/fire/database';
import { Location } from '@angular/common';

@Component({
  selector: 'app-monthly-weight-records-table',
  templateUrl: './monthly-weight-records-table.component.html',
  styleUrls: ['./monthly-weight-records-table.component.css'],
})
export class MonthlyWeightRecordsTableComponent {
  monthlyWeightRecords: any[] = [];
  monthlyWeightRecordsData: any = {};

  constructor(public database: Database, private location: Location) {
    this.fetchmonthlyWeightRecords();
  }

  fetchmonthlyWeightRecords() {
    const monthlyWeightRef = ref(this.database, 'MonthlyWeightRecord');

    get(monthlyWeightRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.monthlyWeightRecords = Object.values(snapshot.val());
        } else {
          this.monthlyWeightRecords = [];
        }
      })
      .catch((error) => {
        console.error('Error retrieving monthlyWeightRecords:', error);
      });
  }
}
