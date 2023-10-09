import { Component } from '@angular/core';

@Component({
  selector: 'app-monthly-weight-records-table',
  templateUrl: './monthly-weight-records-table.component.html',
  styleUrls: ['./monthly-weight-records-table.component.css']
})
export class MonthlyWeightRecordsTableComponent {
  monthlyWeightRecords: any[] = [
      {
        name: 'Ivan',
        birthday: '01/01/2020',
        ageInMonths: 45,
        weight: '12.5 kg',
        weightStatus: 'UnderWeight',
        dateOfWeighing: '24/07/2022',
        barangay: 'Abung'
      },
      {
        name: 'Louige',
        birthday: '25/08/2020',
        ageInMonths: 37,
        weight: '12.5 kg',
        weightStatus: 'UnderWeight',
        dateOfWeighing: '01/07/2022',
        barangay: 'Bataan'
      }
    ];
}
