import { Component } from '@angular/core';
import { Database, set, ref, get } from '@angular/fire/database';

@Component({
  selector: 'app-baseline-weight',
  templateUrl: './baseline-weight.component.html',
  styleUrls: ['./baseline-weight.component.css'],
})
export class BaselineWeightComponent {
  weight: number = 0;
  heightOrLength: number = 0;
  nbsDone: string = 'No';
  barangay: string = 'ABUNG';

  baselineData: any = {
    HouseholdNumber: null,
    NameOfHouseholdHead: '',
    birthday: '',
    bcgDate: '',
    dpt1Date: '',
    dpt2Date: '',
    dpt3Date: '',
    polio1Date: '',
    polio2Date: '',
    polio3Date: '',
    measlesDate: '',
    nbsDone: '',
    dateOfWeighing: '',
    ageInMonth: '',
    weight: '',
    weightStatus: '',
    barangay: '',
  };

  constructor(public database: Database) {}

  onSubmit() {
    if (this.isValidbaselineData()) {
      // Query the latest child ID from the BaselineRecord
      const latestHouseholdNumberRef = ref(this.database, 'BaselineRecord');
      get(latestHouseholdNumberRef).then((snapshot) => {
        let HouseholdNumber = '10001'; // Initialize with '10001'

        // If there are existing baseline records, find the latest ID
        if (snapshot.exists()) {
          const baselineRecord = snapshot.val();
          const latestId = Math.max(...Object.keys(baselineRecord).map(Number));
          HouseholdNumber = (latestId + 1).toString();
        }

        this.baselineData.HouseholdNumber = HouseholdNumber;

        // Add baselineData to BaselineRecord
        set(
          ref(this.database, 'BaselineRecord/' + HouseholdNumber),
          this.baselineData
        )
          .then(() => {
            alert('BaselineRecord added successfully');
            this.clearForm();
          })
          .catch((error) => {
            alert('Error adding baseline record: ' + error);
          });
      });
    } else {
      alert('Invalid baseline data');
      console.log(this.baselineData);
    }
  }

  private clearForm() {
    this.baselineData = {
      HouseholdNumber: null,
      NameOfHouseholdHead: '',
      birthday: '',
      bcgDate: '',
      dpt1Date: '',
      dpt2Date: '',
      dpt3Date: '',
      polio1Date: '',
      polio2Date: '',
      polio3Date: '',
      measlesDate: '',
      nbsDone: '',
      dateOfWeighing: '',
      ageInMonth: '',
      weight: '',
      weightStatus: '',
      barangay: '',
    };
  }

  private isValidbaselineData(): boolean {
    return (
      (this.baselineData.NameOfHouseholdHead &&
        this.baselineData.birthday &&
        this.baselineData.bcgDate) ||
      this.baselineData.dpt1Date ||
      this.baselineData.dpt2Date ||
      this.baselineData.dpt3Date ||
      this.baselineData.polio1Date ||
      this.baselineData.polio2Date ||
      this.baselineData.polio3Date ||
      this.baselineData.measlesDate ||
      (this.baselineData.nbsDone &&
        this.baselineData.dateOfWeighing &&
        this.baselineData.ageInMonth &&
        this.baselineData.weight &&
        this.baselineData.weightStatus &&
        this.baselineData.barangay)
    );
  }
}
