import { Component } from '@angular/core';

@Component({
  selector: 'app-bwir-table',
  templateUrl: './bwir-table.component.html',
  styleUrls: ['./bwir-table.component.css']
})
export class BWIRTableComponent {
  baselineRecords: any[] = [
    {
      HouseholdNumber: '1',
      NameOfHouseholdHead: 'Paul Comia',
      birthday: '26/10/2016',
      bcgDate: '',
      dpt1Date: '30/01/2017',
      dpt2Date: '',
      dpt3Date: '29/06/2017',
      polio1Date: '28/07/2017',
      polio2Date: '24/08/2017',
      polio3Date: '',
      measlesDate: '13/09/2017',
      nbsDone: 'Yes',
      dateOfWeighing: '26/10/2017',
      ageInMonth: '24',
      weight: '12.5',
      weightStatus: 'Normal',
      barangay: 'Libato'
    },

    {
      HouseholdNumber: '2',
      NameOfHouseholdHead: 'Jenny De Chavez',
      birthday: '26/10/2016',
      bcgDate: '06/01/2017',
      dpt1Date: '',
      dpt2Date: '18/02/2017',
      dpt3Date: '24/03/2017',
      polio1Date: '15/04/2017',
      polio2Date: '',
      polio3Date: '30/04/2017',
      measlesDate: '',
      nbsDone: 'Yes',
      dateOfWeighing: '26/10/2017',
      ageInMonth: '24',
      weight: '12.5',
      weightStatus: 'Normal',
      barangay: 'Libato'
    },
  ];

}
