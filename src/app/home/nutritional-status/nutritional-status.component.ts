import { Component } from '@angular/core';

@Component({
  selector: 'app-nutritional-status',
  templateUrl: './nutritional-status.component.html',
  styleUrls: ['./nutritional-status.component.css']
})
export class NutritionalStatusComponent {
  weight: number = 0;
  height: number = 0;

  heightForAge: string = 'SUW';
  weightForAge: string = 'SSt';
  weightForHeight: string = 'SUW';

  practicingEDF: string = 'No';
  practicingCF: string = '';
  beneficiarySF: string = '';
  vitaminALastReceived: string = '';
  ironReceived: string = '';
  usingMNP: string = '';
  onSubmit() {
    
  }
}
