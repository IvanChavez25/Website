import { Component, ElementRef, ViewChild } from '@angular/core';
import { Database, ref, get, update, remove } from '@angular/fire/database';
import { Location } from '@angular/common';

@Component({
  selector: 'app-family-profile-table',
  templateUrl: './family-profile-table.component.html',
  styleUrls: ['./family-profile-table.component.css'],
})
export class FamilyProfileTableComponent {
  family: any[] = [];
  familyData: any = {};

  @ViewChild('updateFamilyModal') updateFamilyModal!: ElementRef;

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
          this.family = Object.values(snapshot.val());
        } else {
          this.family = [];
        }
      })
      .catch((error) => {
        console.error('Error retrieving familyrecords:', error);
      });
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
        this.reloadPage();
      })
      .catch((error) => {
        alert('Error deleting child: ' + error);
      });
  }
}
