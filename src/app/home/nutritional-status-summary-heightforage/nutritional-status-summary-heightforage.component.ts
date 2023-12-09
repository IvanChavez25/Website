import { Component } from '@angular/core';
import { Database, ref, get } from '@angular/fire/database';

interface HeightForAgeTotals {
  barangay: string;
  measurementMonth: number;
  measurementYear: any;
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

  selectedMonth: number = 0;
  selectedYear: number = new Date().getFullYear();
  selectedBarangayInfo: any[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 10;

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
    const groupedData: HeightForAgeTotals[] = [];

    this.nutritionalRecords
      .filter((record) => {
        const year = new Date(record.Date).getFullYear();
        const month = new Date(record.Date).getMonth(); // Filter by selected month

        return month == this.selectedMonth && year == this.selectedYear;
      })

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
            measurementMonth: this.selectedMonth,
            measurementYear: this.selectedYear,
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
        record.barangay === barangayName && record.heightForAge === category
    );

    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
