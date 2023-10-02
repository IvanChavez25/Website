import { Component } from '@angular/core';

@Component({
  selector: 'app-family-profile',
  templateUrl: './family-profile.component.html',
  styleUrls: ['./family-profile.component.css']
})
export class FamilyProfileComponent {
  motherPregnant: boolean = false;
  familyPlanning: boolean = false;
  EBF: boolean = false;
  mixedMilkFeeding: boolean = false;
  bottleFeeding: boolean = false;

  toiletType: string = 'WS';
  waterSource: string = 'P';
  foodProductionActivity: string = 'VG';

  iodizedSalt: boolean = false;
  ifr: boolean = false;
}
