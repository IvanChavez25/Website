import { Component, ElementRef, ViewChild } from '@angular/core';
import { Database, ref, get, update, remove } from '@angular/fire/database';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nutritional-table',
  templateUrl: './nutritional-table.component.html',
  styleUrls: ['./nutritional-table.component.css'],
})
export class NutritionalTableComponent {
  nutritionalRecords: any[] = [];
  nutritionalRecordsData: any = {};

  @ViewChild('updateNutritionalModal') updateNutritionalModal!: ElementRef;

  constructor(public database: Database, private location: Location) {
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
          this.nutritionalRecords = Object.values(snapshot.val());
        } else {
          this.nutritionalRecords = [];
        }
      })
      .catch((error) => {
        console.error('Error retrieving records:', error);
      });
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
        this.reloadPage();
      })
      .catch((error) => {
        alert('Error deleting nutritional status: ' + error);
      });
  }
}
