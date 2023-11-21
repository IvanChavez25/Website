import { Component, ElementRef, ViewChild } from '@angular/core';
import { Database, ref, get, update, remove } from '@angular/fire/database';
import { Location } from '@angular/common';

@Component({
  selector: 'app-bwir-table',
  templateUrl: './bwir-table.component.html',
  styleUrls: ['./bwir-table.component.css'],
})
export class BWIRTableComponent {
  originalBaselineRecords: any[] = [];
  baselineRecords: any[] = [];
  baselineData: any = {};

  selectedBarangay: string = '';
  fromDate: string = '';
  toDate: string = '';
  selectedMonth: any = '';

  @ViewChild('updateBaselineModal') updateBaselineModal!: ElementRef;

  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(public database: Database, private location: Location) {
    this.fetchBaselineRecords();
  }

  fetchBaselineRecords() {
    const baselineRef = ref(this.database, 'BaselineRecord');

    get(baselineRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.originalBaselineRecords = Object.values(snapshot.val());
          this.baselineRecords = Object.values(snapshot.val());
        } else {
          this.baselineRecords = [];
        }
      })
      .catch((error) => {
        console.error('Error retrieving baselineRecords:', error);
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
    let filteredRecords = [...this.originalBaselineRecords];

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
    this.baselineRecords = filteredRecords;
  }

  clearFilters() {
    // Clear the selected barangay, from date, and to date
    this.selectedBarangay = '';
    this.fromDate = '';
    this.toDate = '';
    this.selectedMonth = '';

    // Reset the monthlyHeightRecords to the original data
    this.baselineRecords = [...this.originalBaselineRecords];
  }

  openUpdateBaselineModal(child: any) {
    // Set the health data in the component to be used in the modal form
    this.baselineData = { ...child };

    // Open the update health modal
    this.updateBaselineModal.nativeElement.style.display = 'block';
  }

  updateBaseline() {
    const BaselineRef = ref(
      this.database,
      `BaselineRecord/${this.baselineData.HouseholdNumber}`
    );

    // Update the children's health data in the database
    update(BaselineRef, {
      HouseholdNumber: this.baselineData.HouseholdNumber,
      NameOfHouseholdHead: this.baselineData.NameOfHouseholdHead,
      bcgDate: this.baselineData.bcgDate,
      dpt1Date: this.baselineData.dpt1Date,
      dpt2Date: this.baselineData.dpt2Date,
      dpt3Date: this.baselineData.dpt3Date,
      polio1Date: this.baselineData.polio1Date,
      polio2Date: this.baselineData.polio2Date,
      polio3Date: this.baselineData.polio3Date,
      measlesDate: this.baselineData.measlesDate,
      nbsDone: this.baselineData.nbsDone,
      dateOfWeighing: this.baselineData.dateOfWeighing,
      ageInMonth: this.baselineData.ageInMonth,
      weight: this.baselineData.weight,
      weightStatus: this.baselineData.weightStatus,
    })
      .then(() => {
        alert('Baseline Records Data Updated successfully');
        this.fetchBaselineRecords();
      })
      .catch((error) => {
        console.error('Error updating baseline records:', error);
      });

    // Close the update family modal
    this.updateBaselineModal.nativeElement.style.display = 'none';
  }

  closeUpdateBaselineModal() {
    this.updateBaselineModal.nativeElement.style.display = 'none';
  }
  reloadPage() {
    window.location.reload();
  }

  removeBaseline(record: any) {
    const baselineRef = ref(
      this.database,
      'BaselineRecord/' + record.HouseholdNumber
    );

    remove(baselineRef)
      .then(() => {
        alert('Baseline record deleted successfully');
        this.fetchBaselineRecords();
      })
      .catch((error) => {
        alert('Error deleting Baseline records: ' + error);
      });
  }

  goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  downloadChildData() {
    // Create a CSV header row
    const csvHeader = [
      'Household Number',
      'Name Of Household Head',
      'Name of Child',
      'Birthday',
      'NBS Done',
      'BCG Date',
      'DPT1 Date',
      'DPT2 Date',
      'DPT3 Date',
      'Polio1 Date',
      'Polio2 Date',
      'Polio3 Date',
      'Measles Date',
      'Date Of Weighing',
      'Age In Month',
      'Weight',
      'Weight Status',
      'Barangay',
      'Date',
    ];

    // Convert the child records to a CSV format
    const csvData = this.baselineRecords.map((record) => [
      record.HouseholdNumber,
      record.NameOfHouseholdHead,
      record.nameOfChild,
      record.birthday,
      record.nbsDone,
      record.bcgDate,
      record.dpt1Date,
      record.dpt2Date,
      record.dpt3Date,
      record.polio1Date,
      record.polio2Date,
      record.polio3Date,
      record.measlesDate,
      record.dateOfWeighing,
      record.ageInMonth,
      record.weight,
      record.weightStatus,
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
    a.download = 'bwir_data.csv';

    // Trigger the download
    a.click();

    // Clean up the URL and link element
    window.URL.revokeObjectURL(url);
  }
}
