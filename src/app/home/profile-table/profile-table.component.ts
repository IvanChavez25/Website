import { Component, ElementRef, ViewChild } from '@angular/core';
import { Database, ref, get, update, remove } from '@angular/fire/database';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile-table',
  templateUrl: './profile-table.component.html',
  styleUrls: ['./profile-table.component.css'],
})
export class ProfileTableComponent {
  childRecords: any[] = [];
  childRecordsData: any = {};

  @ViewChild('updateChildModal') updateChildModal!: ElementRef;

  constructor(public database: Database, private location: Location) {
    this.fetchChildRecords();
  }

  ngAfterViewInit() {
    // Hide the updateChildModal on page load
    this.updateChildModal.nativeElement.style.display = 'none';
  }

  fetchChildRecords() {
    const childRef = ref(this.database, 'ChildRecord');

    get(childRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.childRecords = Object.values(snapshot.val());
        } else {
          this.childRecords = [];
        }
      })
      .catch((error) => {
        console.error('Error retrieving records:', error);
      });
  }

  openUpdateChildModal(child: any) {
    // Set the children data in the component to be used in the modal form
    this.childRecordsData = { ...child };

    // Open the update children modal
    this.updateChildModal.nativeElement.style.display = 'block';
    
  }

  updateChild() {
    const childRef = ref(
      this.database,
      `ChildRecord/${this.childRecordsData.childrenId}`
    );

    // Update the children's data in the database
    update(childRef, {
      childrenId: this.childRecordsData.childrenId,
      firstName: this.childRecordsData.firstName,
      middleName: this.childRecordsData.middleName,
      lastName: this.childRecordsData.lastName,
      birthday: this.childRecordsData.birthday,
      age: this.childRecordsData.age,
      address: this.childRecordsData.address,
      barangay: this.childRecordsData.barangay,
      fatherName: this.childRecordsData.fatherName,
      motherName: this.childRecordsData.motherName,
      gender: this.childRecordsData.gender,
    })
      .then(() => {
        alert('Children Data Updated successfully');
        this.fetchChildRecords();
      })
      .catch((error) => {
        console.error('Error updating children:', error);
      });

    // Close the update children modal
    this.updateChildModal.nativeElement.style.display = 'none';
  }

  closeUpdateChildModal() {
    this.updateChildModal.nativeElement.style.display = 'none';
  }

  reloadPage() {
    window.location.reload();
  }

  removeChild(child: any) {
    const childRef = ref(this.database, 'ChildRecord/' + child.childrenId);

    remove(childRef)
      .then(() => {
        alert('Children record deleted successfully');
        this.reloadPage();
      })
      .catch((error) => {
        alert('Error deleting child: ' + error);
      });
  }
}
 