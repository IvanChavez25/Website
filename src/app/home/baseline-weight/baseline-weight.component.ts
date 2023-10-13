import { Component } from '@angular/core';

@Component({
  selector: 'app-baseline-weight',
  templateUrl: './baseline-weight.component.html',
  styleUrls: ['./baseline-weight.component.css']
})
export class BaselineWeightComponent {
  weight: number = 0;
  heightOrLength: number = 0;
  nbsDone: string = 'No';
  barangay: string = 'ABUNG';

}
