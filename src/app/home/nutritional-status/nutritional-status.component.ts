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
  selector: 'app-nutritional-status',
  templateUrl: './nutritional-status.component.html',
  styleUrls: ['./nutritional-status.component.css'],
})
export class NutritionalStatusComponent {
  nutritionalData: any = {
    nutritionalId: null,
    fatherName: '',
    motherName: '',
    nameOfChild: '',
    birthday: '',
    OPTPlus: '',
    ageInMonths: '',
    weight: '',
    height: '',
    weightForAge: '',
    heightForAge: '',
    weightForHeight: '',
    practicingEDF: null,
    practicingCF: null,
    ageStartedCF: '',
    beneficiarySF: null,
    vitaminALastReceived: '',
    ironReceived: '',
    usingMNP: '',
  };

  constructor(public database: Database) {}

  onSubmit() {
    if (this.isValidnutritionalData()) {
      // Query the latest nutritional ID from the NutritionalRecord
      const latestnutritionalIdRef = ref(this.database, 'NutritionalRecord');
      get(latestnutritionalIdRef).then((snapshot) => {
        let nutritionalId = '10001'; // Initialize with '1'

        // If there are existing nutritional records, find the latest ID
        if (snapshot.exists()) {
          const nutritionalRecord = snapshot.val();
          const latestId = Math.max(
            ...Object.keys(nutritionalRecord).map(Number)
          );
          nutritionalId = (latestId + 1).toString();
        }

        this.nutritionalData.nutritionalId = nutritionalId;

        // Add nutritionalData to NutritionalRecord
        set(
          ref(this.database, 'NutritionalRecord/' + nutritionalId),
          this.nutritionalData
        )
          .then(() => {
            alert('NutritionalRecord added successfully');
            this.clearForm();
          })
          .catch((error) => {
            alert('Error adding nutritional: ' + error);
          });
      });
    } else {
      alert('Invalid nutritional data');
      console.log(this.nutritionalData);
    }
  }

  private clearForm() {
    this.nutritionalData = {
      fatherName: '',
      motherName: '',
      nameOfChild: '',
      birthday: '',
      OPTPlus: '',
      ageInMonths: '',
      weight: '',
      height: '',
      weightForAge: '',
      heightForAge: '',
      weightForHeight: '',
      practicingEDF: '',
      practicingCF: '',
      ageStartedCF: '',
      beneficiarySF: '',
      vitaminALastReceived: '',
      ironReceived: '',
      usingMNP: '',
    };
  }

  private isValidnutritionalData(): boolean {
    return (
      this.nutritionalData.fatherName &&
      this.nutritionalData.motherName &&
      this.nutritionalData.nameOfChild &&
      this.nutritionalData.birthday &&
      this.nutritionalData.OPTPlus &&
      this.nutritionalData.ageInMonths &&
      this.nutritionalData.weight &&
      this.nutritionalData.height &&
      this.nutritionalData.weightForAge &&
      this.nutritionalData.heightForAge &&
      this.nutritionalData.weightForHeight &&
      this.nutritionalData.practicingEDF &&
      this.nutritionalData.practicingCF &&
      this.nutritionalData.ageStartedCF &&
      this.nutritionalData.beneficiarySF &&
      this.nutritionalData.vitaminALastReceived &&
      this.nutritionalData.ironReceived &&
      this.nutritionalData.usingMNP
    );
  }
}
