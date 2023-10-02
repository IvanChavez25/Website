import { Component } from '@angular/core';

@Component({
  selector: 'app-nutritional-status',
  templateUrl: './nutritional-status.component.html',
  styleUrls: ['./nutritional-status.component.css']
})
export class NutritionalStatusComponent {
  onSubmit() {
    
  }
  practicingEDF: string = 'No';
  practicingCF: string = '';
  beneficiarySF: string = '';
  vitaminALastReceived: string = '';
  ironReceived: string = '';
  usingMNP: string = '';
}
