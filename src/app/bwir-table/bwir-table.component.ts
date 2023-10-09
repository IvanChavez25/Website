import { Component } from '@angular/core';

@Component({
  selector: 'app-bwir-table',
  templateUrl: './bwir-table.component.html',
  styleUrls: ['./bwir-table.component.css']
})
export class BWIRTableComponent {
  baselineRecords: any[] = [
    {
      householdNumber: '1',
      nameOfHouseholdHead: 'John Doe',
      dateOfBirth: '2000-01-15',
      bcgDate: '2000-02-01',
      hepBDate: '2000-02-15',
      // Add more properties for other dates and fields
      nbsDone: 'Yes',
      dateOfWeighing: '2023-08-20',
      ageInMonth: '24',
      weight: '12.5',
      weightStatus: 'Normal',
      barangay: 'Barangay1'
    },
    // Add more records as needed
  ];

}
