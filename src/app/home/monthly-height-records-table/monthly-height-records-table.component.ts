import { Component } from '@angular/core';
import { Database, ref, get, remove } from '@angular/fire/database';
import { Location } from '@angular/common';

@Component({
  selector: 'app-monthly-height-records-table',
  templateUrl: './monthly-height-records-table.component.html',
  styleUrls: ['./monthly-height-records-table.component.css'],
})
export class MonthlyHeightRecordsTableComponent {
  originalMonthlyHeightRecords: any[] = []; // Store the original data
  monthlyHeightRecords: any[] = [];
  monthlyHeightRecordsData: any = {};
  searchInput: string = '';
  filteredMonthlyHeightRecords: any[] = [];

  selectedBarangay: string = '';
  fromDate: string = ''; // Declare property for From Date
  toDate: string = ''; // Declare property for To Date
  selectedMonth: any = '';

  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(public database: Database, private location: Location) {
    this.fetchmonthlyHeightRecords();
  }

  onSearchInputChange() {
    this.monthlyHeightRecordsData.nameOfChild = this.searchInput;

    if (this.searchInput === '') {
      // Show all children records when the search input is empty
      this.monthlyHeightRecords = this.originalMonthlyHeightRecords;
    } else {
      // Filter children records based on the search input
      this.filteredMonthlyHeightRecords = this.monthlyHeightRecords.filter(
        (child) => {
          return child.nameOfChild
            .toLowerCase()
            .includes(this.searchInput.toLowerCase());
        }
      );
      this.monthlyHeightRecords = this.filteredMonthlyHeightRecords;
    }
  }

  fetchmonthlyHeightRecords() {
    const monthlyHeightRef = ref(this.database, 'MonthlyHeightRecord');

    get(monthlyHeightRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          // Copy the data
          this.originalMonthlyHeightRecords = Object.values(snapshot.val());

          this.originalMonthlyHeightRecords.sort((a, b) => {
            return new Date(b.Date).getTime() - new Date(a.Date).getTime();
          });

          const filteredMonthlyHeightRecords = [];

          for (const record of this.originalMonthlyHeightRecords) {
            if (record.heightForAge !== 'T') {
              filteredMonthlyHeightRecords.push(record);
            }
          }

          // Update monthlyWeightRecords with the filtered array
          this.monthlyHeightRecords = filteredMonthlyHeightRecords;

          this.originalMonthlyHeightRecords = filteredMonthlyHeightRecords;
        } else {
          this.monthlyHeightRecords = [];
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
    let filteredRecords = [...this.originalMonthlyHeightRecords];

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
    this.monthlyHeightRecords = filteredRecords;
  }

  clearFilters() {
    // Clear the selected barangay, from date, and to date
    this.searchInput = '';
    this.selectedBarangay = '';
    this.fromDate = '';
    this.toDate = '';
    this.selectedMonth = '';

    // Reset the monthlyHeightRecords to the original data
    this.monthlyHeightRecords = [...this.originalMonthlyHeightRecords];
  }

  reloadPage() {
    window.location.reload();
  }

  removeMonthlyHeight(record: any) {
    const monthlyHeightRef = ref(
      this.database,
      'MonthlyHeightRecord/' + record.monthlyHeightId
    );

    remove(monthlyHeightRef)
      .then(() => {
        alert('Children Monthly height record deleted successfully');
        this.fetchmonthlyHeightRecords();
      })
      .catch((error) => {
        alert('Error deleting children Monthly height records: ' + error);
      });
  }

  goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  downloadChildData() {
    // Create a CSV header row
    const csvHeader = [
      'Monthly Height Records Id',
      'Name Of Child',
      'Birthday (dd/mm/yyyy)',
      'Age in Months',
      'Weight',
      'Height Or Length',
      'Nutritional Status',
      'Barangay',
      'Date',
    ];

    // Convert the child records to a CSV format
    const csvData = this.monthlyHeightRecords.map((record) => [
      record.monthlyHeightId,
      record.nameOfChild,
      record.birthday,
      record.ageInMonths,
      record.weight,
      record.height,
      record.weightForHeight,
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
    a.download = 'monthlyheight_data.csv';

    // Trigger the download
    a.click();

    // Clean up the URL and link element
    window.URL.revokeObjectURL(url);
  }
}
