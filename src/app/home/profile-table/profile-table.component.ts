import { Component, ElementRef, ViewChild } from '@angular/core';
import { Database, ref, get, update, remove } from '@angular/fire/database';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile-table',
  templateUrl: './profile-table.component.html',
  styleUrls: ['./profile-table.component.css'],
})
export class ProfileTableComponent {
  originalChildRecords: any[] = [];
  childRecords: any[] = [];
  childRecordsData: any = {};

  selectedBarangay: string = '';
  fromDate: string = '';
  toDate: string = '';
  selectedMeasurementMonth: string = '';

  @ViewChild('updateChildModal') updateChildModal!: ElementRef;

  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(public database: Database, private location: Location) {
    this.fetchChildRecords();
  }

  ngAfterViewInit() {
    this.updateChildModal.nativeElement.style.display = 'none';
  }

  fetchChildRecords() {
    const childRef = ref(this.database, 'ChildRecord');

    get(childRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.originalChildRecords = Object.values(snapshot.val());
          this.childRecords = Object.values(snapshot.val());
        } else {
          this.childRecords = [];
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
    let filteredRecords = [...this.originalChildRecords];

    if (this.selectedBarangay) {
      filteredRecords = filteredRecords.filter(
        (record) => record.barangay === this.selectedBarangay
      );
    }

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

        return true;
      });
    }

    if (this.selectedMeasurementMonth) {
      filteredRecords = filteredRecords.filter(
        (record) => record.measurementMonth === this.selectedMeasurementMonth
      );
    }

    this.childRecords = filteredRecords;
  }

  clearFilters() {
    this.selectedBarangay = '';
    this.fromDate = '';
    this.toDate = '';
    this.selectedMeasurementMonth = '';
    this.childRecords = [...this.originalChildRecords];
  }

  openUpdateChildModal(child: any) {
    this.childRecordsData = { ...child };
    this.updateChildModal.nativeElement.style.display = 'block';
  }

  updateChild() {
    const childRef = ref(
      this.database,
      `ChildRecord/${this.childRecordsData.childrenId}`
    );

    update(childRef, {
      childrenId: this.childRecordsData.childrenId,
      firstName: this.childRecordsData.firstName,
      middleName: this.childRecordsData.middleName,
      lastName: this.childRecordsData.lastName,
      birthday: this.childRecordsData.birthday,
      age: this.childRecordsData.age,
      ageInMonths: this.childRecordsData.ageInMonths,
      weight: this.childRecordsData.weight,
      height: this.childRecordsData.height,
      address: this.childRecordsData.address,
      barangay: this.childRecordsData.barangay,
      fatherName: this.childRecordsData.fatherName,
      motherName: this.childRecordsData.motherName,
      gender: this.childRecordsData.gender,
      date: this.childRecordsData.date,
      measurementMonth: this.childRecordsData.measurementMonth,
    })
      .then(() => {
        alert('Children Data Updated successfully');
        this.fetchChildRecords();
      })
      .catch((error) => {
        console.error('Error updating children:', error);
      });

    this.updateChildModal.nativeElement.style.display = 'none';
  }

  closeUpdateChildModal() {
    this.updateChildModal.nativeElement.style.display = 'none';
  }

  removeChild(child: any) {
    const childRef = ref(this.database, 'ChildRecord/' + child.childrenId);

    remove(childRef)
      .then(() => {
        alert('Children record deleted successfully');
        this.fetchChildRecords();
      })
      .catch((error) => {
        alert('Error deleting child: ' + error);
      });
  }

  goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }
}
