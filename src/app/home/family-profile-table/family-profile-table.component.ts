import { Component, ElementRef, ViewChild } from '@angular/core';
import { Database, ref, get, update, remove } from '@angular/fire/database';
import { Location } from '@angular/common';

@Component({
  selector: 'app-family-profile-table',
  templateUrl: './family-profile-table.component.html',
  styleUrls: ['./family-profile-table.component.css'],
})
export class FamilyProfileTableComponent {
  originalFamily: any[] = [];
  family: any[] = [];
  familyData: any = {};

  selectedBarangay: string = '';
  fromDate: string = '';
  toDate: string = '';
  selectedMeasurementMonth: string = '';

  @ViewChild('updateFamilyModal') updateFamilyModal!: ElementRef;

  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(public database: Database, private location: Location) {
    this.fetchfamily();
  }

  ngAfterViewInit() {
    // Hide the updateChildModal on page load
    this.updateFamilyModal.nativeElement.style.display = 'none';
  }

  fetchfamily() {
    const familyRef = ref(this.database, 'FamilyRecord');

    get(familyRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.originalFamily = Object.values(snapshot.val());
          this.family = Object.values(snapshot.val());
        } else {
          this.family = [];
        }
      })
      .catch((error) => {
        console.error('Error retrieving familyrecords:', error);
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
    let filteredRecords = [...this.originalFamily];

    // Apply the barangay filter
    if (this.selectedBarangay) {
      filteredRecords = filteredRecords.filter(
        (record) => record.barangay === this.selectedBarangay
      );
    }

    if (this.selectedMeasurementMonth) {
      filteredRecords = filteredRecords.filter(
        (record) => record.measurementMonth === this.selectedMeasurementMonth
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

    // Update the monthlyHeightRecords with the filtered data
    this.family = filteredRecords;
  }

  clearFilters() {
    // Clear the selected barangay, from date, and to date
    this.selectedBarangay = '';
    this.fromDate = '';
    this.toDate = '';
    this.selectedMeasurementMonth = '';

    // Reset the monthlyHeightRecords to the original data
    this.family = [...this.originalFamily];
  }

  openUpdateFamilyModal(child: any) {
    // Set the family data in the component to be used in the modal form
    this.familyData = { ...child };

    // Open the update family modal
    this.updateFamilyModal.nativeElement.style.display = 'block';
  }

  updateFamily() {
    const familyRef = ref(
      this.database,
      `FamilyRecord/${this.familyData.houseHoldNumberId}`
    );

    // Update the children's data in the database
    update(familyRef, {
      houseHoldNumberId: this.familyData.houseHoldNumberId,
      houseHoldMember: this.familyData.houseHoldMember,
      zeroToFiveMonthsOld: this.familyData.zeroToFiveMonthsOld,
      sixToTwentyThreeMonthsOld: this.familyData.sixToTwentyThreeMonthsOld,
      twentyFourToFiftyNineMonthsOld:
        this.familyData.twentyFourToFiftyNineMonthsOld,
      belowSixtyMonthsOld: this.familyData.belowSixtyMonthsOld,
      headOrSpouse: this.familyData.headOrSpouse,
      occupation: this.familyData.occupation,
      educationalAttainment: this.familyData.educationalAttainment,
      motherPregnant: this.familyData.motherPregnant,
      familyPlanning: this.familyData.familyPlanning,
      exclusiveBreastfeeding: this.familyData.exclusiveBreastfeeding,
      mixedMilkFeeding: this.familyData.mixedMilkFeeding,
      bottleFeeding: this.familyData.bottleFeeding,
      toiletType: this.familyData.toiletType,
      waterSource: this.familyData.waterSource,
      foodProductionActivity: this.familyData.foodProductionActivity,
      iodizedSalt: this.familyData.iodizedSalt,
      ifr: this.familyData.ifr,
      barangay: this.familyData.barangay,
      date: this.familyData.date,
      measurementMonth: this.familyData.measurementMonth,
    })
      .then(() => {
        alert('Family Data Updated successfully');
        this.fetchfamily();
      })
      .catch((error) => {
        console.error('Error updating family:', error);
      });

    // Close the update family modal
    this.updateFamilyModal.nativeElement.style.display = 'none';
  }

  closeUpdateFamilyModal() {
    this.updateFamilyModal.nativeElement.style.display = 'none';
  }
  reloadPage() {
    window.location.reload();
  }

  removeFamily(record: any) {
    const familyRef = ref(
      this.database,
      'FamilyRecord/' + record.houseHoldNumberId
    );

    remove(familyRef)
      .then(() => {
        alert('Family record deleted successfully');
        this.fetchfamily();
      })
      .catch((error) => {
        alert('Error deleting child: ' + error);
      });
  }

  goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  downloadChildData() {
    // Create a CSV header row
    const csvHeader = [
      'HouseHold Number Id',
      'HouseHold Member',
      'Zero To Five Months Old',
      'Six To Twenty Three Months Old',
      'Twenty Four To Fifty Nine Months Old',
      'Below Sixty Months Old',
      'Head Or Spouse',
      'Occupation',
      'Educational Attainment',
      'Mother Pregnant',
      'Family Planning',
      'Exclusive Breastfeeding',
      'Mixed Milk Feeding',
      'Bottle Feeding',
      'Toilet Type',
      'Water Source',
      'Food Production Activity',
      'Iodized Salt',
      'IFR',
      'Date',
      'Measurement Month',
    ];

    // Convert the child records to a CSV format
    const csvData = this.family.map((record) => [
      record.houseHoldNumberId,
      record.houseHoldMember,
      record.zeroToFiveMonthsOld,
      record.sixToTwentyThreeMonthsOld,
      record.twentyFourToFiftyNineMonthsOld,
      record.belowSixtyMonthsOld,
      record.headOrSpouse,
      record.occupation,
      record.educationalAttainment,
      record.motherPregnant,
      record.familyPlanning,
      record.exclusiveBreastfeeding,
      record.mixedMilkFeeding,
      record.bottleFeeding,
      record.toiletType,
      record.waterSource,
      record.foodProductionActivity,
      record.iodizedSalt,
      record.ifr,
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
    a.download = 'family_data.csv';

    // Trigger the download
    a.click();

    // Clean up the URL and link element
    window.URL.revokeObjectURL(url);
  }
}
