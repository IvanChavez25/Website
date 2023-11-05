import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

import {
  Database,
  set,
  ref,
  push,
  update,
  remove,
  get,
} from '@angular/fire/database';

@Component({
  selector: 'app-family-profile',
  templateUrl: './family-profile.component.html',
  styleUrls: ['./family-profile.component.css'],
})
export class FamilyProfileComponent {
  familyData: any = {
    houseHoldNumberId: null,
    houseHoldMember: '',
    zeroToFiveMonthsOld: '',
    sixToTwentyThreeMonthsOld: '',
    twentyFourToFiftyNineMonthsOld: '',
    belowSixtyMonthsOld: '',
    headOrSpouse: '',
    occupation: '',
    educationalAttainment: '',
    motherPregnant: null,
    familyPlanning: null,
    exclusiveBreastfeeding: null,
    mixedMilkFeeding: null,
    bottleFeeding: null,
    toiletType: '',
    waterSource: '',
    foodProductionActivity: '',
    iodizedSalt: null,
    ifr: null,
    barangay: '',
    date: '',
    measurementMonth: '',
  };

  constructor(public database: Database) {}

  onSubmit() {
    if (this.isValidfamilyData()) {
      // Query the latest child ID from the FamilyRecord
      const latesthouseHoldNumberIdRef = ref(this.database, 'FamilyRecord');
      get(latesthouseHoldNumberIdRef).then((snapshot) => {
        let houseHoldNumberId = '10001'; // Initialize with '10001'

        // If there are existing family records, find the latest ID
        if (snapshot.exists()) {
          const familyRecord = snapshot.val();
          const latestId = Math.max(...Object.keys(familyRecord).map(Number));
          houseHoldNumberId = (latestId + 1).toString();
        }

        this.familyData.houseHoldNumberId = houseHoldNumberId;

        // Add familyRecordData to FamilyRecord
        set(
          ref(this.database, 'FamilyRecord/' + houseHoldNumberId),
          this.familyData
        )
          .then(() => {
            alert('FamilyRecord added successfully');
            this.clearForm();
          })
          .catch((error) => {
            alert('Error adding family record: ' + error);
          });
      });
    } else {
      alert('Invalid family data');
      console.log(this.familyData);
    }
  }

  private clearForm() {
    this.familyData = {
      houseHoldMember: '',
      zeroToFiveMonthsOld: '',
      sixToTwentyThreeMonthsOld: '',
      twentyFourToFiftyNineMonthsOld: '',
      belowSixtyMonthsOld: '',
      headOrSpouse: '',
      occupation: '',
      educationalAttainment: '',
      motherPregnant: '',
      familyPlanning: '',
      exclusiveBreastfeeding: '',
      mixedMilkFeeding: '',
      bottleFeeding: '',
      toiletType: '',
      waterSource: '',
      foodProductionActivity: '',
      iodizedSalt: '',
      ifr: '',
      date: '',
      measurementMonth: '',
    };
  }

  private isValidfamilyData(): boolean {
    return (
      this.familyData.houseHoldMember &&
      this.familyData.zeroToFiveMonthsOld &&
      this.familyData.sixToTwentyThreeMonthsOld &&
      this.familyData.twentyFourToFiftyNineMonthsOld &&
      this.familyData.belowSixtyMonthsOld &&
      this.familyData.headOrSpouse &&
      this.familyData.occupation &&
      this.familyData.educationalAttainment &&
      this.familyData.motherPregnant ||
      this.familyData.familyPlanning ||
      this.familyData.exclusiveBreastfeeding ||
      this.familyData.mixedMilkFeeding ||
      this.familyData.bottleFeeding ||
      this.familyData.toiletType &&
      this.familyData.waterSource &&
      this.familyData.foodProductionActivity &&
      this.familyData.iodizedSalt ||
      this.familyData.ifr ||
      this.familyData.date &&
      this.familyData.measurementMonth
    );
  }
}
