import { Component } from '@angular/core';

@Component({
  selector: 'app-monthly-height-records-table',
  templateUrl: './monthly-height-records-table.component.html',
  styleUrls: ['./monthly-height-records-table.component.css']
})
export class MonthlyHeightRecordsTableComponent {
  monthlyHeightRecords: any[] = [
      {
        name: 'Ivan',
        birthday: '01/01/2020',
        ageInMonths: 45,
        weight: '12.5 kg',
        height: '80 cm',
        nutritionalStatus: 'Normal',
        barangay: 'Abung'
      },
      {
        name: 'Louige',
        birthday: '25/08/2020',
        ageInMonths: 37,
        weight: '12.5 kg',
        height: '80 cm',
        nutritionalStatus: 'Normal',
        barangay: 'Bataan'
      }
    ];
  }

