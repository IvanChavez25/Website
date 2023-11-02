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
  selectedMeasurementMonth: string = '';

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

    if (this.selectedMeasurementMonth) {
      filteredRecords = filteredRecords.filter(
        (record) => record.measurementMonth === this.selectedMeasurementMonth
      );
    }

    // Update the monthlyHeightRecords with the filtered data
    this.baselineRecords = filteredRecords;
  }

  clearFilters() {
    // Clear the selected barangay, from date, and to date
    this.selectedBarangay = '';
    this.fromDate = '';
    this.toDate = '';
    this.selectedMeasurementMonth = '';

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
      birthday: this.baselineData.birthday,
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
      barangay: this.baselineData.barangay,
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
        this.reloadPage();
      })
      .catch((error) => {
        alert('Error deleting Baseline records: ' + error);
      });
  }

  goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }
}
