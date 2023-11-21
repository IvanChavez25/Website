import { Component } from '@angular/core';
import { Database, ref, get } from '@angular/fire/database';

interface WeightForAgeTotals {
  barangay: string;
  measurementMonth: number;
  measurementYear: any;
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

  selectedMonth: number = 0;
  selectedYear: number | null = null;
  selectedBarangayInfo: any[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(public database: Database) {
    this.fetchNutritionalRecords();
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endIndex(): number {
    return this.startIndex + this.itemsPerPage;
  }

  goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
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
          console.log(this.nutritionalRecords);
        }
      })
      .catch((error) => {
        console.error('Error retrieving records:', error);
      });
  }

  onMonthYearSelect() {
    this.fetchNutritionalRecords();
  }

  calculateTotalsByBarangay() {
    const groupedData: WeightForAgeTotals[] = [];

    this.nutritionalRecords

      .filter((record) => {
        const year = new Date(record.Date).getFullYear();
        const month = new Date(record.Date).getMonth();

        return month == this.selectedMonth && year == this.selectedYear;
      })

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
            measurementYear: this.selectedYear,
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
      filteredRecords = this.nutritionalRecords.filter((record) => {
        const year = new Date(record.Date).getFullYear();
        const month = new Date(record.Date).getMonth();

        return month == this.selectedMonth && year == this.selectedYear;
      });
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
