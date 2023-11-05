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

  selectedBarangay: string = '';
  fromDate: string = '';
  toDate: string = '';
  selectedMeasurementMonth: string = '';

  @ViewChild('updateQuarterlyModal') updateQuarterlyModal!: ElementRef;

  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(public database: Database, private location: Location) {
    this.fetchquarterlyTable();
  }

  fetchquarterlyTable() {
    const quarterlyRef = ref(this.database, 'QuarterlyTable');

    get(quarterlyRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.originalQuarterlyTable = Object.values(snapshot.val());
          this.quarterlyTable = Object.values(snapshot.val());
        } else {
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

    if (this.selectedMeasurementMonth) {
      filteredRecords = filteredRecords.filter(
        (record) => record.measurementMonth === this.selectedMeasurementMonth
      );
    }

    this.quarterlyTable = filteredRecords;
  }

  clearFilters() {
    this.selectedBarangay = '';
    this.fromDate = '';
    this.toDate = '';
    this.selectedMeasurementMonth = '';

    this.quarterlyTable = [...this.originalQuarterlyTable];
  }

  openUpdateQuarterlyModal(child: any) {
    // Set the health data in the component to be used in the modal form
    this.quarterlyTableData = { ...child };

    // Open the update health modal
    this.updateQuarterlyModal.nativeElement.style.display = 'block';
  }

  updateQuarterly() {
    const quarterlyRef = ref(
      this.database,
      `QuarterlyTable/${this.quarterlyTableData.quarterlyId}`
    );

    // Update the children's health data in the database
    update(quarterlyRef, {
      quarterlyId: this.quarterlyTableData.quarterlyId,
      nameOfChild: this.quarterlyTableData.nameOfChild,
      birthday: this.quarterlyTableData.birthday,
      ageInMonth: this.quarterlyTableData.ageInMonth,
      weight: this.quarterlyTableData.weight,
      heightOrLength: this.quarterlyTableData.heightOrLength,
      weightForLengthOrHeight: this.quarterlyTableData.weightForLengthOrHeight,
      nutritionalStatus: this.quarterlyTableData.nutritionalStatus,
      barangay: this.quarterlyTableData.barangay,
      date: this.quarterlyTableData.date,
      measurementMonth: this.quarterlyTableData.measurementMonth,
    })
      .then(() => {
        alert('Children Quarterly Records Data Updated successfully');
        this.fetchquarterlyTable();
      })
      .catch((error) => {
        console.error('Error updating Quarterly children records:', error);
      });

    this.updateQuarterlyModal.nativeElement.style.display = 'none';
  }

  closeUpdateQuarterlyModal() {
    this.updateQuarterlyModal.nativeElement.style.display = 'none';
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
      'Measurement Month',
    ];

    // Convert the child records to a CSV format
    const csvData = this.quarterlyTable.map((record) => [
      record.quarterlyId,
      record.nameOfChild.firstName + ' ' + record.nameOfChild?.lastName,
      record.birthday,
      record.ageInMonth,
      record.weight,
      record.heightOrLength,
      record.weightForLengthOrHeight,
      record.nutritionalStatus,
      record.barangay,
      record.date,
      record.measurementMonth,
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
