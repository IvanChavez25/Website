import { Component } from '@angular/core';

@Component({
  selector: 'app-health-records',
  templateUrl: './health-records.component.html',
  styleUrls: ['./health-records.component.css']
})
export class HealthRecordsComponent {
  weightForAge: string = 'SUW';
  heightForAge: string = 'SSt';
  weightForHeight: string = 'SUW';

  onSubmit() {
    
  }
}
