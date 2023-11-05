import { Component, ElementRef, ViewChild } from '@angular/core';
import { Database, ref, get, update, remove } from '@angular/fire/database';
import { Location } from '@angular/common';
import { SharedDataServiceService } from '../shared-data-service.service';

@Component({
  selector: 'app-nutritional-table',
  templateUrl: './nutritional-table.component.html',
  styleUrls: ['./nutritional-table.component.css'],
})
export class NutritionalTableComponent {
  originalNutritionalRecords: any[] = [];
  userRole: string = '';
  nutritionalRecords: any[] = [];
  nutritionalRecordsData: any = {};

  selectedBarangay: string = '';
  fromDate: string = '';
  toDate: string = '';
  selectedMeasurementMonth: string = '';

  @ViewChild('updateNutritionalModal') updateNutritionalModal!: ElementRef;

  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(
    public database: Database,
    private location: Location,
    private sharedDataService: SharedDataServiceService
  ) {
    this.fetchNutritionalRecords();
  }

  ngAfterViewInit() {
    // Hide the updateNutritionalModal on page load
    this.updateNutritionalModal.nativeElement.style.display = 'none';
  }

  fetchNutritionalRecords() {
    const nutritionalRef = ref(this.database, 'NutritionalRecord');

    get(nutritionalRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.originalNutritionalRecords = Object.values(snapshot.val());
          this.nutritionalRecords = Object.values(snapshot.val());
        } else {
          this.nutritionalRecords = [];
        }
      })
      .catch((error) => {
        console.error('Error retrieving records:', error);
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
    let filteredRecords = [...this.originalNutritionalRecords];

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
    this.nutritionalRecords = filteredRecords;
  }

  clearFilters() {
    // Clear the selected barangay, from date, and to date
    this.selectedBarangay = '';
    this.fromDate = '';
    this.toDate = '';
    this.selectedMeasurementMonth = '';

    // Reset the monthlyHeightRecords to the original data
    this.nutritionalRecords = [...this.originalNutritionalRecords];
  }

  openUpdateNutritionalModal(record: any) {
    // Set the nutritional data in the component to be used in the modal form
    this.nutritionalRecordsData = { ...record };

    // Open the update nutritional modal
    this.updateNutritionalModal.nativeElement.style.display = 'block';
  }

  updateNutritional() {
    const nutritionalRef = ref(
      this.database,
      `NutritionalRecord/${this.nutritionalRecordsData.nutritionalId}`
    );

    // Update the nutritional's data in the database
    update(nutritionalRef, {
      nutritionalId: this.nutritionalRecordsData.nutritionalId,
      fatherName: this.nutritionalRecordsData.fatherName,
      motherName: this.nutritionalRecordsData.motherName,
      nameOfChild: this.nutritionalRecordsData.nameOfChild,
      OPTPlus: this.nutritionalRecordsData.OPTPlus,
      ageInMonths: this.nutritionalRecordsData.ageInMonths,
      weight: this.nutritionalRecordsData.weight,
      height: this.nutritionalRecordsData.height,
      weightForAge: this.nutritionalRecordsData.weightForAge,
      heightForAge: this.nutritionalRecordsData.heightForAge,
      weightForHeight: this.nutritionalRecordsData.weightForHeight,
      practicingEDF: this.nutritionalRecordsData.practicingEDF,
      practicingCF: this.nutritionalRecordsData.practicingCF,
      ageStartedCF: this.nutritionalRecordsData.ageStartedCF,
      beneficiarySF: this.nutritionalRecordsData.beneficiarySF,
      vitaminALastReceived: this.nutritionalRecordsData.vitaminALastReceived,
      ironReceived: this.nutritionalRecordsData.ironReceived,
      usingMNP: this.nutritionalRecordsData.usingMNP,
      date: this.nutritionalRecordsData.date,
      measurementMonth: this.nutritionalRecordsData.measurementMonth,
    })
      .then(() => {
        alert('Nutritional Data Updated successfully');
        this.fetchNutritionalRecords();
      })
      .catch((error) => {
        console.error('Error updating nutritional status:', error);
      });

    // Close the update nutritional modal
    this.updateNutritionalModal.nativeElement.style.display = 'none';
  }

  closeUpdateNutritionalModal() {
    this.updateNutritionalModal.nativeElement.style.display = 'none';
  }

  reloadPage() {
    window.location.reload();
  }

  removeNutritional(record: any) {
    const nutritionalRef = ref(
      this.database,
      'NutritionalRecord/' + record.nutritionalId
    );

    remove(nutritionalRef)
      .then(() => {
        alert('nutritional record deleted successfully');
        this.fetchNutritionalRecords();
      })
      .catch((error) => {
        alert('Error deleting nutritional status: ' + error);
      });
  }
  goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }
}
