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

  selectedBarangay: string = '';
  fromDate: string = '';
  toDate: string = '';
  selectedMeasurementMonth: string = '';

  @ViewChild('updateMonthlyWeightModal') updateMonthlyWeightModal!: ElementRef;

  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(public database: Database, private location: Location) {
    this.fetchmonthlyWeightRecords();
  }

  fetchmonthlyWeightRecords() {
    const monthlyWeightRef = ref(this.database, 'MonthlyWeightRecord');

    get(monthlyWeightRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.originalMonthlyWeightRecords = Object.values(snapshot.val());
          this.monthlyWeightRecords = [...this.originalMonthlyWeightRecords]; // Copy the data
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

    if (this.selectedMeasurementMonth) {
      filteredRecords = filteredRecords.filter(
        (record) => record.measurementMonth === this.selectedMeasurementMonth
      );
    }

    // Update the monthlyHeightRecords with the filtered data
    this.monthlyWeightRecords = filteredRecords;
  }

  clearFilters() {
    // Clear the selected barangay, from date, and to date
    this.selectedBarangay = '';
    this.fromDate = '';
    this.toDate = '';
    this.selectedMeasurementMonth = '';

    // Reset the monthlyHeightRecords to the original data
    this.monthlyWeightRecords = [...this.originalMonthlyWeightRecords];
  }

  openUpdateMonthlyWeightModal(child: any) {
    // Set the health data in the component to be used in the modal form
    this.monthlyWeightRecordsData = { ...child };

    // Open the update health modal
    this.updateMonthlyWeightModal.nativeElement.style.display = 'block';
  }

  updateMonthlyWeight() {
    const monthlyWeightRef = ref(
      this.database,
      `MonthlyWeightRecord/${this.monthlyWeightRecordsData.monthlyWeightRecordsId}`
    );

    // Update the children's health data in the database
    update(monthlyWeightRef, {
      monthlyWeightRecordsId:
        this.monthlyWeightRecordsData.monthlyWeightRecordsId,
      nameOfChild: this.monthlyWeightRecordsData.nameOfChild,
      birthday: this.monthlyWeightRecordsData.birthday,
      ageInMonths: this.monthlyWeightRecordsData.ageInMonths,
      weight: this.monthlyWeightRecordsData.weight,
      weightStatus: this.monthlyWeightRecordsData.weightStatus,
      dateOfWeighing: this.monthlyWeightRecordsData.dateOfWeighing,
      barangay: this.monthlyWeightRecordsData.barangay,
      Date: this.monthlyWeightRecordsData.Date,
      measurementMonth: this.monthlyWeightRecordsData.measurementMonth,
    })
      .then(() => {
        alert('Children Monthly Weight Records Data Updated successfully');
        this.fetchmonthlyWeightRecords();
      })
      .catch((error) => {
        console.error('Error updating Monthly Weight children records:', error);
      });

    this.updateMonthlyWeightModal.nativeElement.style.display = 'none';
  }

  closeUpdateMonthlyWeightModal() {
    this.updateMonthlyWeightModal.nativeElement.style.display = 'none';
  }
  reloadPage() {
    window.location.reload();
  }

  removeMonthlyWeight(record: any) {
    const monthlyWeightRef = ref(
      this.database,
      'MonthlyWeightRecord/' + record.monthlyWeightRecordsId
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
      'Weight Status',
      'Date Of Weighing',
      'Nutritional Status',
      'Barangay',
      'Date',
      'Measurement Month',
    ];

    // Convert the child records to a CSV format
    const csvData = this.monthlyWeightRecords.map((record) => [
      record.monthlyWeightRecordsId,
      record.nameOfChild,
      record.birthday,
      record.ageInMonths,
      record.weight,
      record.weightStatus,
      record.dateOfWeighing,
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
    a.download = 'monthlyweight_data.csv';

    // Trigger the download
    a.click();

    // Clean up the URL and link element
    window.URL.revokeObjectURL(url);
  }
}
