import { Component } from '@angular/core';
import { Database, ref, get, update, remove } from '@angular/fire/database';
import { Location } from '@angular/common';

@Component({
  selector: 'app-quarterly-table',
  templateUrl: './quarterly-table.component.html',
  styleUrls: ['./quarterly-table.component.css']
})
export class QuarterlyTableComponent {
  quarterlyTable: any[] = [];
  quarterlyTableData: any = {};

  constructor(public database: Database, private location: Location) {
    this.fetchQuarterlyTable();
  }

  fetchQuarterlyTable() {

    const QuarterlyRef = ref(this.database, 'QuarterlyTable');


    get(QuarterlyRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.quarterlyTable = Object.values(snapshot.val());
        } else {
          this.quarterlyTable = [];
        }
      })
      .catch((error) => {
        console.error('Error retrieving quarterlytable:', error);
      });
  }
}
