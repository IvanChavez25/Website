import { Component, ElementRef, ViewChild } from '@angular/core';
import { Database, ref, get, update, remove } from '@angular/fire/database';
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
  selectedBarangay: string = '';

  fromDate: string = ''; // Declare property for From Date
  toDate: string = ''; // Declare property for To Date
  selectedMeasurementMonth: string = '';

  @ViewChild('updateMonthlyHeightModal') updateMonthlyHeightModal!: ElementRef;

  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(public database: Database, private location: Location) {
    this.fetchmonthlyHeightRecords();
  }

  fetchmonthlyHeightRecords() {
    const monthlyHeightRef = ref(this.database, 'MonthlyHeightRecord');

    get(monthlyHeightRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.originalMonthlyHeightRecords = Object.values(snapshot.val());
          this.monthlyHeightRecords = [...this.originalMonthlyHeightRecords]; // Copy the data
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

    if (this.selectedMeasurementMonth) {
      filteredRecords = filteredRecords.filter(
        (record) => record.measurementMonth === this.selectedMeasurementMonth
      );
    }

    // Update the monthlyHeightRecords with the filtered data
    this.monthlyHeightRecords = filteredRecords;
  }

  clearFilters() {
    // Clear the selected barangay, from date, and to date
    this.selectedBarangay = '';
    this.fromDate = '';
    this.toDate = '';
    this.selectedMeasurementMonth = '';

    // Reset the monthlyHeightRecords to the original data
    this.monthlyHeightRecords = [...this.originalMonthlyHeightRecords];
  }

  openUpdateMonthlyHeightModal(child: any) {
    // Set the health data in the component to be used in the modal form
    this.monthlyHeightRecordsData = { ...child };

    // Open the update health modal
    this.updateMonthlyHeightModal.nativeElement.style.display = 'block';
  }

  updateMonthlyHeight() {
    const monthlyHeightRef = ref(
      this.database,
      `MonthlyHeightRecord/${this.monthlyHeightRecordsData.monthlyHeightRecordsId}`
    );

    // Update the children's health data in the database
    update(monthlyHeightRef, {
      monthlyHeightRecordsId:
        this.monthlyHeightRecordsData.monthlyHeightRecordsId,
      nameOfChild: this.monthlyHeightRecordsData.nameOfChild,
      birthday: this.monthlyHeightRecordsData.birthday,
      ageInMonths: this.monthlyHeightRecordsData.ageInMonths,
      weight: this.monthlyHeightRecordsData.weight,
      heightOrLength: this.monthlyHeightRecordsData.heightOrLength,
      nutritionalStatus: this.monthlyHeightRecordsData.nutritionalStatus,
      barangay: this.monthlyHeightRecordsData.barangay,
      Date: this.monthlyHeightRecordsData.Date,
      measurementMonth: this.monthlyHeightRecordsData.measurementMonth,
    })
      .then(() => {
        alert('Children Monthly Height Records Data Updated successfully');
        this.fetchmonthlyHeightRecords();
      })
      .catch((error) => {
        console.error('Error updating Monthly Height children records:', error);
      });

    this.updateMonthlyHeightModal.nativeElement.style.display = 'none';
  }

  closeUpdateMonthlyHeightModal() {
    this.updateMonthlyHeightModal.nativeElement.style.display = 'none';
  }
  reloadPage() {
    window.location.reload();
  }

  removeMonthlyHeight(record: any) {
    const monthlyHeightRef = ref(
      this.database,
      'MonthlyHeightRecord/' + record.monthlyHeightRecordsId
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
      'Measurement Month',
    ];

    // Convert the child records to a CSV format
    const csvData = this.monthlyHeightRecords.map((record) => [
      record.monthlyHeightRecordsId,
      record.nameOfChild.firstName + ' ' + record.nameOfChild?.lastName,
      record.birthday,
      record.ageInMonths,
      record.weight,
      record.heightOrLength,
      record.nutritionalStatus,
      record.barangay,
      record.Date,
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
    a.download = 'monthlyheight_data.csv';

    // Trigger the download
    a.click();

    // Clean up the URL and link element
    window.URL.revokeObjectURL(url);
  }
}
