import { Component, ElementRef, ViewChild } from '@angular/core';
import { Database, ref, get, update, remove } from '@angular/fire/database';
import { Location } from '@angular/common';

@Component({
  selector: 'app-monthly-weight-records-table',
  templateUrl: './monthly-weight-records-table.component.html',
  styleUrls: ['./monthly-weight-records-table.component.css'],
})
export class MonthlyWeightRecordsTableComponent {
  originalMonthlyWeightRecords: any[] = [];
  monthlyWeightRecords: any[] = [];
  monthlyWeightRecordsData: any = {};
  searchInput: string = '';
  filteredMonthlyWeightRecords: any[] = [];

  selectedBarangay: string = '';
  fromDate: string = '';
  toDate: string = '';
  selectedMonth: any = '';

  @ViewChild('updateMonthlyWeightModal') updateMonthlyWeightModal!: ElementRef;

  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(public database: Database, private location: Location) {
    this.fetchmonthlyWeightRecords();
  }

  onSearchInputChange() {
    this.monthlyWeightRecordsData.nameOfChild = this.searchInput;

    if (this.searchInput === '') {
      // Show all children records when the search input is empty
      this.monthlyWeightRecords = this.originalMonthlyWeightRecords;
    } else {
      // Filter children records based on the search input
      this.filteredMonthlyWeightRecords = this.monthlyWeightRecords.filter(
        (child) => {
          return child.nameOfChild
            .toLowerCase()
            .includes(this.searchInput.toLowerCase());
        }
      );
      this.monthlyWeightRecords = this.filteredMonthlyWeightRecords;
    }
  }

  fetchmonthlyWeightRecords() {
    const monthlyWeightRef = ref(this.database, 'MonthlyWeightRecord');

    get(monthlyWeightRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          // Copy the data
          this.originalMonthlyWeightRecords = Object.values(snapshot.val());

          this.originalMonthlyWeightRecords.sort((a, b) => {
            return new Date(b.Date).getTime() - new Date(a.Date).getTime();
          });

          // Initialize an array to store filtered weightForAge values
          const filteredMonthlyWeightRecords = [];

          // Loop through monthlyWeightRecords
          for (const record of this.originalMonthlyWeightRecords) {
            // Check if the weightForAge is 'OW'
            if (record.weightForAge !== 'OW') {
              // Add the record to the filtered array
              filteredMonthlyWeightRecords.push(record);
            }
          }

          // Update monthlyWeightRecords with the filtered array
          this.monthlyWeightRecords = filteredMonthlyWeightRecords;
          this.originalMonthlyWeightRecords = filteredMonthlyWeightRecords;
        } else {
          this.monthlyWeightRecords = [];
        }
      })
      .catch((error) => {
        console.error('Error retrieving monthlyHeightRecords:', error);
      });
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endIndex(): number {
    return this.startIndex + this.itemsPerPage;
  }

  filterRecords() {
    // Create a copy of the original data
    let filteredRecords = [...this.originalMonthlyWeightRecords];

    // Apply the barangay filter
    if (this.selectedBarangay) {
      filteredRecords = filteredRecords.filter(
        (record) => record.barangay === this.selectedBarangay
      );
    }

    // Apply the date range filter if either fromDate or toDate is provided
    if (this.fromDate || this.toDate) {
      filteredRecords = filteredRecords.filter((record) => {
        const recordDate = new Date(record.Date);
        recordDate.setHours(23, 59, 59, 999);

        if (this.fromDate && this.toDate) {
          const fromDateObj = new Date(this.fromDate);
          const toDateObj = new Date(this.toDate);
          toDateObj.setHours(23, 59, 59, 999);

          return recordDate >= fromDateObj && recordDate <= toDateObj;
        } else if (this.fromDate) {
          const fromDateObj = new Date(this.fromDate);
          return recordDate >= fromDateObj;
        } else if (this.toDate) {
          const toDateObj = new Date(this.toDate);
          toDateObj.setHours(23, 59, 59, 999);
          return recordDate <= toDateObj;
        }

        return true; // No date filter applied
      });
    }

    if (this.selectedMonth) {
      filteredRecords = filteredRecords.filter((record) => {
        const year = new Date(record.Date).getFullYear();
        const month = new Date(record.Date).getMonth();

        return month == this.selectedMonth;
      });
    }

    // Update the monthlyHeightRecords with the filtered data
    this.monthlyWeightRecords = filteredRecords;
  }

  clearFilters() {
    // Clear the selected barangay, from date, and to date
    this.searchInput = '';
    this.selectedBarangay = '';
    this.fromDate = '';
    this.toDate = '';
    this.selectedMonth = '';
    
    // Reset the monthlyHeightRecords to the original data
    this.monthlyWeightRecords = [...this.originalMonthlyWeightRecords];
  }

  reloadPage() {
    window.location.reload();
  }

  removeMonthlyWeight(record: any) {
    const monthlyWeightRef = ref(
      this.database,
      'MonthlyWeightRecord/' + record.monthlyWeightId
    );

    remove(monthlyWeightRef)
      .then(() => {
        alert('Children Monthly Weight record deleted successfully');
        this.fetchmonthlyWeightRecords();
      })
      .catch((error) => {
        alert('Error deleting children Monthly Weight records: ' + error);
      });
  }

  goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  downloadChildData() {
    // Create a CSV header row
    const csvHeader = [
      'Monthly Weight Records Id',
      'Name Of Child',
      'Birthday (dd/mm/yyyy)',
      'Age in Months',
      'Weight',
      'Nutritional Status',
      'Barangay',
      'Date',
    ];

    // Convert the child records to a CSV format
    const csvData = this.monthlyWeightRecords.map((record) => [
      record.monthlyWeightId,
      record.nameOfChild,
      record.birthday,
      record.ageInMonths,
      record.weight,
      record.weightForAge,
      record.barangay,
      record.Date,
    ]);

    // Combine the header and data
    const csvContent = [csvHeader, ...csvData]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    // Create a Blob containing the CSV data
    const blob = new Blob([csvContent], { type: 'text/csv' });

    // Create a download URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create a link element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'monthlyweight_data.csv';

    // Trigger the download
    a.click();

    // Clean up the URL and link element
    window.URL.revokeObjectURL(url);
  }
}
