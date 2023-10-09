import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-table',
  templateUrl: './profile-table.component.html',
  styleUrls: ['./profile-table.component.css']
})
export class ProfileTableComponent {
  children: any[] = [
    {
      firstName: 'Ivan',
      middleName: 'Hernandez',
      lastName: 'Chavez',
      birthday: '25/08/2010',
      address: 'Tangisan, Libjo Batangas City',
      barangay: 'Libjo',
      fathersName: 'Luiz Chavez',
      mothersName: 'Aniceta Chavez',
      gender: 'Male'
    },

  ];
}
