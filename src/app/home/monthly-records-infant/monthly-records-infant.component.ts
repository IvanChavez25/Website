import { Component, ElementRef, ViewChild } from '@angular/core';
import { Database, ref, get, update, remove } from '@angular/fire/database';
import { Location } from '@angular/common';

@Component({
  selector: 'app-monthly-records-infant',
  templateUrl: './monthly-records-infant.component.html',
  styleUrls: ['./monthly-records-infant.component.css'],
})
export class MonthlyRecordsInfantComponent {
  originalMonthlyInfantRecords: any[] = [];
  monthlyInfantRecords: any[] = [];
  monthlyInfantRecordsData: any = {};
  searchInput: string = '';
  filteredMonthlyInfantRecords: any[] = [];

  selectedBarangay: string = '';
  fromDate: string = ''; // Declare property for From Date
  toDate: string = '';
  selectedMonth: any = '';

  @ViewChild('updateMonthlyInfantModal') updateMonthlyInfantModal!: ElementRef;

  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(public database: Database, private location: Location) {
    this.fetchmonthlyInfantRecords();
  }

  onSearchInputChange() {
    this.monthlyInfantRecordsData.nameOfChild = this.searchInput;

    if (this.searchInput === '') {
      // Show all children records when the search input is empty
      this.filteredMonthlyInfantRecords = this.monthlyInfantRecords;
    } else {
      // Filter children records based on the search input
      this.filteredMonthlyInfantRecords = this.monthlyInfantRecords.filter(
        (child) => {
          return child.nameOfChild
            .toLowerCase()
            .includes(this.searchInput.toLowerCase());
        }
      );
    }

    this.filterRecords();
  }

  fetchmonthlyInfantRecords() {
    const monthlyInfantRef = ref(this.database, 'MonthlyInfantRecord');

    get(monthlyInfantRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.originalMonthlyInfantRecords = Object.values(snapshot.val());
          this.monthlyInfantRecords = Object.values(snapshot.val());
        } else {
          this.monthlyInfantRecords = [];
        }
      })
      .catch((error) => {
        console.error('Error retrieving monthlyInfantRecords:', error);
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
    let filteredRecords = [...this.filteredMonthlyInfantRecords];

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

    // Update the monthlyInfantRecords with the filtered data
    this.monthlyInfantRecords = filteredRecords;
  }

  clearFilters() {
    // Clear the selected barangay, from date, and to date
    this.searchInput = '';
    this.selectedBarangay = '';
    this.fromDate = '';
    this.toDate = '';
    this.selectedMonth = '';

    // Reset the monthlyHeightRecords to the original data
    this.monthlyInfantRecords = [...this.originalMonthlyInfantRecords];
  }

  reloadPage() {
    window.location.reload();
  }

  removeMonthlyInfant(record: any) {
    const monthlyInfantRef = ref(
      this.database,
      'MonthlyInfantRecord/' + record.monthlyInfantRecordsId
    );

    remove(monthlyInfantRef)
      .then(() => {
        alert('Children Monthly Infant record deleted successfully');
        this.fetchmonthlyInfantRecords();
      })
      .catch((error) => {
        alert('Error deleting children Monthly Infant records: ' + error);
      });
  }

  goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  downloadChildData() {
    // Create a CSV header row
    const csvHeader = [
      'Monthly Infant Records Id',
      'Name Of Child',
      'Birthday (dd/mm/yyyy)',
      'Age in Months',
      'Weight',
      'Height Or Length',
      'Weight For Length Or Height',
      'Weight For Age',
      'Height For Age',
      'Weight For Length Or Height',
      'Barangay',
      'Date',
    ];

    // Convert the child records to a CSV format
    const csvData = this.monthlyInfantRecords.map((record) => [
      record.monthlyInfantRecordsId,
      record.nameOfChild,
      record.birthday,
      record.ageInMonths,
      record.weight,
      record.height,
      record.weightForLengthOrHeight,
      record.weightForAge,
      record.heightForAge,
      record.weightForLengthorHeight,
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
    a.download = 'monthlyinfant_data.csv';

    // Trigger the download
    a.click();

    // Clean up the URL and link element
    window.URL.revokeObjectURL(url);
  }
}
