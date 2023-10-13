import { Component } from '@angular/core';

@Component({
  selector: 'app-health-records-table',
  templateUrl: './health-records-table.component.html',
  styleUrls: ['./health-records-table.component.css']
})
export class HealthRecordsTableComponent {
  healthRecords: any[] = [
    {
      childrenName: 'Ivan Chavez',
      age: 3,
      weight: 15,
      height: 90,
      vitamin: 'Vitamin A',
      lateDateReceived: '2023-08-15',
      weightForAge: 'Normal',
      heightForAge: 'Normal',
      weightForHeight: 'Normal'
    },
    {
      childrenName: 'Eban De Chavez',
      age: 4,
      weight: 16,
      height: 92,
      vitamin: 'Vitamin C',
      lateDateReceived: '2023-09-01',
      weightForAge: 'Normal',
      heightForAge: 'Normal',
      weightForHeight: 'Normal'
    }

  ];
}
