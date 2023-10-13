import { Component } from '@angular/core';

@Component({
  selector: 'app-quarterly-records',
  templateUrl: './quarterly-records.component.html',
  styleUrls: ['./quarterly-records.component.css']
})
export class QuarterlyRecordsComponent {
    weight: number = 0;
    heightOrLength: number = 0;
    weightForLengthOrHeight: number = 0;
  onSubmit() {
    
  }
}
