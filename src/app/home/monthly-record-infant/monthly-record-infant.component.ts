import { Component } from '@angular/core';

@Component({
  selector: 'app-monthly-record-infant',
  templateUrl: './monthly-record-infant.component.html',
  styleUrls: ['./monthly-record-infant.component.css']
})
export class MonthlyRecordInfantComponent {

    weight: number = 0;
    heightOrLength: number = 0;
    weightForLengthOrHeight: number = 0;

    weightForAge: string = 'SUW';

}
