import { Component } from '@angular/core';
import { Database, ref, get } from '@angular/fire/database';
import Chart from 'chart.js/auto';

interface WeightForHeightTotals {
  barangay: string;
  severelyUnderweight: number;
  underweight: number;
  normal: number;
  obese: number;
}

@Component({
  selector: 'app-nutritional-status-summary-weightforheight',
  templateUrl: './nutritional-status-summary-weightforheight.component.html',
  styleUrls: ['./nutritional-status-summary-weightforheight.component.css'],
})
export class NutritionalStatusSummaryWeightforheightComponent {
  nutritionalRecords: any[] = [];
  barangayData: WeightForHeightTotals[] = [];

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
    const groupedData: WeightForHeightTotals[] = [];

    this.nutritionalRecords
      .filter((record) => record.measurementMonth === this.selectedMonth) // Filter by selected month
      .forEach((record) => {
        const barangayName = record.barangay;
        const existingBarangay = groupedData.find(
          (data) => data.barangay === barangayName
        );

        if (existingBarangay) {
          switch (record.weightForHeight) {
            case 'SUW':
              existingBarangay.severelyUnderweight++;
              break;
            case 'UW':
              existingBarangay.underweight++;
              break;
            case 'N':
              existingBarangay.normal++;
              break;
            case 'OW':
              existingBarangay.obese++;
              break;
            default:
              break;
          }
        } else {
          const totals: WeightForHeightTotals = {
            barangay: barangayName,
            severelyUnderweight: 0,
            underweight: 0,
            normal: 0,
            obese: 0,
          };

          switch (record.weightForHeight) {
            case 'SUW':
              totals.severelyUnderweight++;
              break;
            case 'UW':
              totals.underweight++;
              break;
            case 'N':
              totals.normal++;
              break;
            case 'O':
              totals.obese++;
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
        record.barangay === barangayName && record.weightForHeight === category
    );

    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
