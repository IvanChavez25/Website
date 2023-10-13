import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildrenInfoComponent } from './children-info/children-info.component';
import { HealthRecordsComponent } from './health-records/health-records.component';
import { MonthlyRecordComponent } from './monthly-record/monthly-record.component';
import { NutritionalStatusComponent } from './nutritional-status/nutritional-status.component';
import { FamilyProfileComponent } from './family-profile/family-profile.component';
import { QuarterlyRecordsComponent } from './quarterly-records/quarterly-records.component';
import { MonthlyWeightComponent } from './monthly-weight/monthly-weight.component';
import { MonthlyRecordInfantComponent } from './monthly-record-infant/monthly-record-infant.component';
import { BaselineWeightComponent } from './baseline-weight/baseline-weight.component';
import { HealthRecordsTableComponent } from './health-records-table/health-records-table.component';
import { BWIRTableComponent } from './bwir-table/bwir-table.component';
import { MonthlyHeightRecordsTableComponent } from './monthly-height-records-table/monthly-height-records-table.component';
import { MonthlyWeightRecordsTableComponent } from './monthly-weight-records-table/monthly-weight-records-table.component';
import { MonthlyRecordsInfantComponent } from './monthly-records-infant/monthly-records-infant.component';
import { ProfileTableComponent } from './profile-table/profile-table.component';
import { FamilyProfileTableComponent } from './family-profile-table/family-profile-table.component';
import { BmiCalculatorComponent } from './bmicalculator/bmicalculator.component';
import { HomeComponent } from './home.component';


const routes: Routes = [
  {
    path: 'home' , component:HomeComponent,
    children: [
      {path: 'childreninfo', component:ChildrenInfoComponent},
      {path: 'healthrecords', component:HealthRecordsComponent},
      {path: 'monthlyrecords', component:MonthlyRecordComponent},
      {path: 'nutritionalstatus', component:NutritionalStatusComponent},
      {path: 'familyprofile', component:FamilyProfileComponent},
      {path: 'quarterlyrecords', component:QuarterlyRecordsComponent},
      {path: 'monthlyweight', component:MonthlyWeightComponent},
      {path: 'monthlyrecordsinfant', component:MonthlyRecordInfantComponent},
      {path: 'baselineweight', component:BaselineWeightComponent},
      {path: 'healthrecordstable', component:HealthRecordsTableComponent},
      {path: 'bwirtable', component:BWIRTableComponent},
      {path: 'monthlyheightrecordstable', component:MonthlyHeightRecordsTableComponent},
      {path: 'monthlyweightrecordstable', component:MonthlyWeightRecordsTableComponent},
      {path: 'monthlyrecordsinfanttable', component:MonthlyRecordsInfantComponent},
      {path: 'profiletable', component:ProfileTableComponent},
      {path: 'familyprofiletable', component:FamilyProfileTableComponent},
      {path:'bmi', component:BmiCalculatorComponent},
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
