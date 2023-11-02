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
  selectedBarangay: string = '';

  fromDate: string = ''; // Declare property for From Date
  toDate: string = '';
  selectedMeasurementMonth: string = '';

  @ViewChild('updateMonthlyInfantModal') updateMonthlyInfantModal!: ElementRef;

  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(public database: Database, private location: Location) {
    this.fetchmonthlyInfantRecords();
  }

  fetchmonthlyInfantRecords() {
    const monthlyInfantRef = ref(this.database, 'MonthlyInfantRecord');

    get(monthlyInfantRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
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
    let filteredRecords = [...this.originalMonthlyInfantRecords];

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

    // Update the monthlyInfantRecords with the filtered data
    this.monthlyInfantRecords = filteredRecords;
  }

  clearFilters() {
    // Clear the selected barangay, from date, and to date
    this.selectedBarangay = '';
    this.fromDate = '';
    this.toDate = '';
    this.selectedMeasurementMonth = '';

    // Reset the monthlyHeightRecords to the original data
    this.monthlyInfantRecords = [...this.originalMonthlyInfantRecords];
  }

  openUpdateMonthlyInfantModal(child: any) {
    // Set the health data in the component to be used in the modal form
    this.monthlyInfantRecordsData = { ...child };

    // Open the update health modal
    this.updateMonthlyInfantModal.nativeElement.style.display = 'block';
  }

  updateMonthlyInfant() {
    const monthlyInfantRef = ref(
      this.database,
      `MonthlyInfantRecord/${this.monthlyInfantRecordsData.monthlyInfantRecordsId}`
    );

    // Update the children's health data in the database
    update(monthlyInfantRef, {
      monthlyInfantRecordsId:
        this.monthlyInfantRecordsData.monthlyInfantRecordsId,
      nameOfChild: this.monthlyInfantRecordsData.nameOfChild,
      birthday: this.monthlyInfantRecordsData.birthday,
      ageInMonths: this.monthlyInfantRecordsData.ageInMonths,
      weight: this.monthlyInfantRecordsData.weight,
      heightOrLength: this.monthlyInfantRecordsData.heightOrLength,
      weightForLengthOrHeight:
        this.monthlyInfantRecordsData.weightForLengthOrHeight,
      weightForAge: this.monthlyInfantRecordsData.weightForAge,
      heightOrLengths: this.monthlyInfantRecordsData.heightOrLengths,
      weightForLengthorHeight:
        this.monthlyInfantRecordsData.weightForLengthorHeight,
      barangay: this.monthlyInfantRecordsData.barangay,
      Date: this.monthlyInfantRecordsData.Date,
      measurementMonth: this.monthlyInfantRecordsData.measurementMonth,
    })
      .then(() => {
        alert('Children Monthly Infant Records Data Updated successfully');
        this.fetchmonthlyInfantRecords();
      })
      .catch((error) => {
        console.error('Error updating children Monthly Infant records:', error);
      });

    this.updateMonthlyInfantModal.nativeElement.style.display = 'none';
  }

  closeUpdateMonthlyInfantModal() {
    this.updateMonthlyInfantModal.nativeElement.style.display = 'none';
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
        this.reloadPage();
      })
      .catch((error) => {
        alert('Error deleting children Monthly Infant records: ' + error);
      });
  }

  goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }
}
