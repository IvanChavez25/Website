import { Component } from '@angular/core';
import { Database, ref, get } from '@angular/fire/database';

interface WeightForAgeTotals {
  barangay: string;
  measurementMonth: string;
  severelyUnderweight: number;
  underweight: number;
  normalWeight: number;
  overweight: number;
}

@Component({
  selector: 'app-nutritional-status-summary',
  templateUrl: './nutritional-status-summary.component.html',
  styleUrls: ['./nutritional-status-summary.component.css'],
})
export class NutritionalStatusSummaryComponent {
  nutritionalRecords: any[] = [];
  barangayData: WeightForAgeTotals[] = [];

  selectedMonth: string = 'January';
  selectedBarangayInfo: any[] = [];

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
    const groupedData: WeightForAgeTotals[] = [];

    this.nutritionalRecords
      .filter((record) => record.measurementMonth === this.selectedMonth) // Filter by selected month
      .forEach((record) => {
        const barangayName = record.barangay;
        const existingBarangay = groupedData.find(
          (data) => data.barangay === barangayName
        );

        if (existingBarangay) {
          switch (record.weightForAge) {
            case 'SUW':
              existingBarangay.severelyUnderweight++;
              break;
            case 'UW':
              existingBarangay.underweight++;
              break;
            case 'N':
              existingBarangay.normalWeight++;
              break;
            case 'OW':
              existingBarangay.overweight++;
              break;
            default:
              break;
          }
        } else {
          const totals: WeightForAgeTotals = {
            barangay: barangayName,
            measurementMonth: this.selectedMonth,
            severelyUnderweight: 0,
            underweight: 0,
            normalWeight: 0,
            overweight: 0,
          };

          switch (record.weightForAge) {
            case 'SUW':
              totals.severelyUnderweight++;
              break;
            case 'UW':
              totals.underweight++;
              break;
            case 'N':
              totals.normalWeight++;
              break;
            case 'OW':
              totals.overweight++;
              break;
            default:
              break;
          }

          groupedData.push(totals);
        }
      });

    this.barangayData = groupedData;
  }

  showModal = false;

  showDetailedInfoByCategory(
    barangayName: string,
    category: string,
    barangayValue: number
  ) {
    // Filter records based on the selected month
    let filteredRecords = this.nutritionalRecords;
    if (this.selectedMonth) {
      filteredRecords = this.nutritionalRecords.filter(
        (record) => record.measurementMonth === this.selectedMonth
      );
    }

    if (barangayValue === 0) {
      return;
    }

    // Filter records for the specific barangay and category
    this.selectedBarangayInfo = filteredRecords.filter(
      (record) =>
        record.barangay === barangayName && record.weightForAge === category
    );

    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
