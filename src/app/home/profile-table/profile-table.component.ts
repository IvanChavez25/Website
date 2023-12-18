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
  searchInput: string = '';
  filteredChildRecords: any[] = [];

  selectedBarangay: string = '';
  fromDate: string = '';
  toDate: string = '';

  @ViewChild('updateChildModal') updateChildModal!: ElementRef;

  currentPage: number = 1;
  itemsPerPage: number = 15;

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

  onSearchInputChange() {
    this.childRecordsData.firstName = this.searchInput;
    this.childRecordsData.middleName = this.searchInput;
    this.childRecordsData.lastName = this.searchInput;

    if (this.searchInput === '') {
      // Show all children records when the search input is empty
      this.childRecords = this.originalChildRecords;
    } else {
      // Filter children records based on the search input
      this.filteredChildRecords = this.childRecords.filter((child) => {
        const fullName = `${child.firstName} ${
          child.middleName ? child.middleName + ' ' : ''
        }${child.lastName}`;
        return fullName.toLowerCase().includes(this.searchInput.toLowerCase());
      });

      
    this.childRecords = this.filteredChildRecords;
    }

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

    this.childRecords = filteredRecords;
  }

  clearFilters() {
    this.searchInput = '';
    this.selectedBarangay = '';
    this.fromDate = '';
    this.toDate = '';
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
      address: this.childRecordsData.address,
      barangay: this.childRecordsData.barangay,
      fatherName: this.childRecordsData.fatherName,
      motherName: this.childRecordsData.motherName,
      NameOfHouseholdHead: this.childRecordsData.NameOfHouseholdHead,
      gender: this.childRecordsData.gender,
      date: this.childRecordsData.date,
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

  downloadChildData() {
    // Create a CSV header row
    const csvHeader = [
      'Children ID',
      'First Name',
      'Middle Name',
      'Last Name',
      'Birthday (dd/mm/yyyy)',
      'Address',
      'Barangay',
      "Father's Name",
      "Mother's Name",
      'Name of HouseHold Head',
      'Gender',
      'Date',
    ];

    // Convert the child records to a CSV format
    const csvData = this.childRecords.map((child) => [
      child.childrenId,
      child.firstName,
      child.middleName,
      child.lastName,
      child.birthday,
      child.address,
      child.barangay,
      child.fatherName,
      child.motherName,
      child.NameOfHouseholdHead,
      child.gender,
      child.Date,
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
    a.download = 'child_data.csv';

    // Trigger the download
    a.click();

    // Clean up the URL and link element
    window.URL.revokeObjectURL(url);
  }
}
