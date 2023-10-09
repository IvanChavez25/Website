import { Component } from '@angular/core';

@Component({
  selector: 'app-family-profile-table',
  templateUrl: './family-profile-table.component.html',
  styleUrls: ['./family-profile-table.component.css']
})
export class FamilyProfileTableComponent {
  families: any[] = [
    {
      householdNumber: '001',
      numberOfHouseholdMembers: 9,
      children: {
        age0To5Months: 1,
        age6To23Months: 2,
        age24To59Months: 1,
        below60Months: 3
      },
      householdHeadSpouseName: 'Aniceta Chavez',
      occupation: 'Commerce',
      educationalAttainment: 'Bachelor\'s Degree',
      isPregnant: false,
      practicesFamilyPlanning: true,
      exclusiveBreastfeeding: true,
      mixedMilkFeeding: false,
      bottleFeeding: false,
      toiletType: 'Water Sealed',
      waterSource: 'Piped',
      foodProductionActivity: 'Poultry/Livestock',
      usingIodizedSalt: true,
      usingIFR: false
    },

  ];
}
