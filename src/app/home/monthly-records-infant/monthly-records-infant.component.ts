import { Component } from '@angular/core';
import { Database, ref, get, update, remove } from '@angular/fire/database';
import { Location } from '@angular/common';

@Component({
  selector: 'app-monthly-records-infant',
  templateUrl: './monthly-records-infant.component.html',
  styleUrls: ['./monthly-records-infant.component.css'],
})
export class MonthlyRecordsInfantComponent {
  monthlyInfantRecords: any[] = [];
  monthlyInfantRecordsData: any = {};

  constructor(public database: Database, private location: Location) {
    this.fetchmonthlyInfantRecords();
  }

  fetchmonthlyInfantRecords() {
    const monthlyInfantRef = ref(this.database, 'MonthlyInfantRecord');

    get(monthlyInfantRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.monthlyInfantRecords = Object.values(snapshot.val());
        } else {
          this.monthlyInfantRecords = [];
        }
      })
      .catch((error) => {
        console.error('Error retrieving monthlyInfantRecords:', error);
      });
  }
}
