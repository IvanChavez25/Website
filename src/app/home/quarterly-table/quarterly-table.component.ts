import { Component, ElementRef, ViewChild } from '@angular/core';
import { Database, ref, get, update, remove } from '@angular/fire/database';
import { Location } from '@angular/common';

@Component({
  selector: 'app-quarterly-table',
  templateUrl: './quarterly-table.component.html',
  styleUrls: ['./quarterly-table.component.css'],
})
export class QuarterlyTableComponent {
  originalQuarterlyTable: any[] = [];
  quarterlyTable: any[] = [];
  quarterlyTableData: any = {};
  searchInput: string = '';
  filteredQuarterlyTable: any[] = [];

  selectedBarangay: string = '';
  fromDate: string = '';
  toDate: string = '';
  selectedMonth: any = '';

  @ViewChild('updateQuarterlyModal') updateQuarterlyModal!: ElementRef;

  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(public database: Database, private location: Location) {
    this.fetchquarterlyTable();
  }

  onSearchInputChange() {
    this.quarterlyTableData.nameOfChild = this.searchInput;

    if (this.searchInput === '') {
      // Show all children records when the search input is empty
      this.quarterlyTable = this.originalQuarterlyTable;
    } else {
      // Filter children records based on the search input
      this.filteredQuarterlyTable = this.quarterlyTable.filter((child) => {
        return child.nameOfChild
          .toLowerCase()
          .includes(this.searchInput.toLowerCase());
      });
      this.quarterlyTable = this.filteredQuarterlyTable;
    }
  }

  fetchquarterlyTable() {
    const quarterlyRef = ref(this.database, 'QuarterlyTable');

    get(quarterlyRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.originalQuarterlyTable = Object.values(snapshot.val());
          this.originalQuarterlyTable.sort((a, b) => {
            return new Date(b.Date).getTime() - new Date(a.Date).getTime();
          });

          const filteredQuarterlyTable = [];

          // Loop through originalMonthlyInfantRecords
          for (const record of this.originalQuarterlyTable) {
            // Check if ageInMonths is less than 23
            if (record.ageInMonths >= 24 && record.ageInMonths <= 59) {
              // Add the record to the filtered arraye
              filteredQuarterlyTable.push(record);
            }
          }

          this.quarterlyTable = filteredQuarterlyTable;

          this.originalQuarterlyTable = filteredQuarterlyTable;
        } else {
          // Set monthlyInfantRecords to an empty array if no data exists
          this.quarterlyTable = [];
        }
      })
      .catch((error) => {
        console.error('Error retrieving quarterlytable:', error);
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
    let filteredRecords = [...this.originalQuarterlyTable];

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
    this.quarterlyTable = filteredRecords;
  }

  clearFilters() {
    this.searchInput = '';
    this.selectedBarangay = '';
    this.fromDate = '';
    this.toDate = '';
    this.selectedMonth = '';

    this.quarterlyTable = [...this.originalQuarterlyTable];
  }

  openUpdateQuarterlyModal(record: any) {
    // Set the health data in the component to be used in the modal form
    this.quarterlyTableData = { ...record };

    // Open the update health modal
    this.updateQuarterlyModal.nativeElement.style.display = 'block';
  }

  reloadPage() {
    window.location.reload();
  }

  removeQuarterly(record: any) {
    const quarterlyRef = ref(
      this.database,
      'QuarterlyTable/' + record.quarterlyId
    );

    remove(quarterlyRef)
      .then(() => {
        alert('Children quarterly record deleted successfully');
        this.fetchquarterlyTable();
      })
      .catch((error) => {
        alert('Error deleting children quarterly records: ' + error);
      });
  }

  goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  downloadChildData() {
    // Create a CSV header row
    const csvHeader = [
      'Quarterly ID',
      'Name Of Child',
      'Birthday (dd/mm/yyyy)',
      'Age in Months',
      'Weight',
      'Height Or Length',
      'Weight For Length Or Height',
      'Nutritional Status',
      'Barangay',
      'Date',
    ];

    // Convert the child records to a CSV format
    const csvData = this.quarterlyTable.map((record) => [
      record.quarterlyId,
      record.nameOfChild,
      record.birthday,
      record.ageInMonths,
      record.weight,
      record.height,
      record.bmiData,
      record.nutritionalStatus,
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
    a.download = 'quarterly_data.csv';

    // Trigger the download
    a.click();

    // Clean up the URL and link element
    window.URL.revokeObjectURL(url);
  }
}
