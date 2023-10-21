import { Component, ElementRef, ViewChild } from '@angular/core';
import { Database, ref, get, update, remove } from '@angular/fire/database';
import { Location } from '@angular/common';

@Component({
  selector: 'app-health-records-table',
  templateUrl: './health-records-table.component.html',
  styleUrls: ['./health-records-table.component.css'],
})
export class HealthRecordsTableComponent {
  healthRecords: any[] = [];
  healthRecordsData: any = {};

  @ViewChild('updateHealthModal') updateHealthModal!: ElementRef;

  constructor(public database: Database, private location: Location) {
    this.fetchHealthRecords();
  }

  fetchHealthRecords() {
    const healthRef = ref(this.database, 'HealthRecord');

    get(healthRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.healthRecords = Object.values(snapshot.val());
        } else {
          this.healthRecords = [];
        }
      })
      .catch((error) => {
        console.error('Error retrieving children health records:', error);
      });
  }
  openUpdateHealthModal(child: any) {
    // Set the health data in the component to be used in the modal form
    this.healthRecordsData = { ...child };

    // Open the update health modal
    this.updateHealthModal.nativeElement.style.display = 'block';
  }

  updateHealth() {
    const healthRef = ref(
      this.database,
      `HealthRecord/${this.healthRecordsData.healthRecordsId}`
    );

    // Update the children's health data in the database
    update(healthRef, {
      healthRecordsId: this.healthRecordsData.healthRecordsId,
      childrenName: this.healthRecordsData.childrenName,
      age: this.healthRecordsData.age,
      weight: this.healthRecordsData.weight,
      height: this.healthRecordsData.height,
      vitamin: this.healthRecordsData.vitamin,
      lastDateReceived: this.healthRecordsData.lastDateReceived,
      weightForAge: this.healthRecordsData.weightForAge,
      heightForAge: this.healthRecordsData.heightForAge,
      weightForHeight: this.healthRecordsData.weightForHeight,
      date: this.healthRecordsData.date,
    })
      .then(() => {
        alert('Children Health Records Data Updated successfully');
        this.fetchHealthRecords();
      })
      .catch((error) => {
        console.error('Error updating health children records:', error);
      });

    // Close the update family modal
    this.updateHealthModal.nativeElement.style.display = 'none';
  }

  closeUpdateHealthModal() {
    this.updateHealthModal.nativeElement.style.display = 'none';
  }
  reloadPage() {
    window.location.reload();
  }

  removeHealth(record: any) {
    const healthRef = ref(
      this.database,
      'HealthRecord/' + record.healthRecordsId
    );

    remove(healthRef)
      .then(() => {
        alert('Children health record deleted successfully');
        this.reloadPage();
      })
      .catch((error) => {
        alert('Error deleting children health records: ' + error);
      });
  }
}
