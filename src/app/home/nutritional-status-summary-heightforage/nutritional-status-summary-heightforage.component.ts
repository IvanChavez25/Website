import { Component } from '@angular/core';
import { Database, ref, get } from '@angular/fire/database';
import Chart from 'chart.js/auto';

interface HeightForAgeTotals {
  barangay: string;
  severelyStunted: number;
  stunted: number;
  normal: number;
  tall: number;
}

@Component({
  selector: 'app-nutritional-status-summary-heightforage',
  templateUrl: './nutritional-status-summary-heightforage.component.html',
  styleUrls: ['./nutritional-status-summary-heightforage.component.css'],
})
export class NutritionalStatusSummaryHeightforageComponent {
  nutritionalRecords: any[] = [];
  barangayData: HeightForAgeTotals[] = [];

  selectedMonth: string = 'January';

  constructor(public database: Database) {
    this.fetchNutritionalRecords();
  }

  fetchNutritionalRecords() {
    const nutritionalRef = ref(this.database, 'NutritionalRecord');

    get(nutritionalRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.nutritionalRecords = Object.values(snapshot.val());
          this.calculateTotalsByBarangay();
        } else {
          this.nutritionalRecords = [];
        }
      })
      .catch((error) => {
        console.error('Error retrieving records:', error);
      });
  }

  onMonthSelect() {
    this.fetchNutritionalRecords();
  }

  calculateTotalsByBarangay() {
    const groupedData: HeightForAgeTotals[] = [];

    this.nutritionalRecords
      .filter((record) => record.measurementMonth === this.selectedMonth) // Filter by selected month
      .forEach((record) => {
        const barangayName = record.barangay;
        const existingBarangay = groupedData.find(
          (data) => data.barangay === barangayName
        );

        if (existingBarangay) {
          switch (record.heightForAge) {
            case 'SSt':
              existingBarangay.severelyStunted++;
              break;
            case 'St':
              existingBarangay.stunted++;
              break;
            case 'N':
              existingBarangay.normal++;
              break;
            case 'T':
              existingBarangay.tall++;
              break;
            default:
              break;
          }
        } else {
          const totals: HeightForAgeTotals = {
            barangay: barangayName,
            severelyStunted: 0,
            stunted: 0,
            normal: 0,
            tall: 0,
          };

          switch (record.heightForAge) {
            case 'SSt':
              totals.severelyStunted++;
              break;
            case 'St':
              totals.stunted++;
              break;
            case 'N':
              totals.normal++;
              break;
            case 'T':
              totals.tall++;
              break;
            default:
              break;
          }

          groupedData.push(totals);
        }
      });

    this.barangayData = groupedData;
  }
}
