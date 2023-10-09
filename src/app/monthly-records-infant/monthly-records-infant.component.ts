import { Component } from '@angular/core';

@Component({
  selector: 'app-monthly-records-infant',
  templateUrl: './monthly-records-infant.component.html',
  styleUrls: ['./monthly-records-infant.component.css']
})
export class MonthlyRecordsInfantComponent {
  infantRecords: any[]; // Replace 'any[]' with the actual type of your data

  constructor() {
    // Initialize the data source with sample data (replace this with your actual data)
    this.infantRecords = [
      {
        name: 'Child 1',
        birthday: '01/01/2022',
        ageInMonths: 6,
        measurements: {
          weight: '6.2 kg',
          heightOrLength: '60 cm',
          weightForLengthOrHeight: 'Normal'
        },
        nutritionalStatus: {
          weightForAge: 'Normal',
          heightOrLengthForAge: 'Normal',
          weightForLengthOrHeight: 'Normal'
        },
        barangay: 'Barangay 1'
      },
      // Add more records as needed
    ];
  }
}
