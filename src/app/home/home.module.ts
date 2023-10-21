import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { BmiCalculatorComponent } from './bmicalculator/bmicalculator.component';
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
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { QuarterlyTableComponent } from './quarterly-table/quarterly-table.component';
import { NutritionalTableComponent } from './nutritional-table/nutritional-table.component';




@NgModule({
  declarations: [
    BmiCalculatorComponent,
    ChildrenInfoComponent,
    HealthRecordsComponent,
    MonthlyRecordComponent,
    NutritionalStatusComponent,
    FamilyProfileComponent,
    QuarterlyRecordsComponent,
    MonthlyWeightComponent,
    MonthlyRecordInfantComponent,
    BaselineWeightComponent,
    HealthRecordsTableComponent,
    BWIRTableComponent,
    MonthlyHeightRecordsTableComponent,
    MonthlyWeightRecordsTableComponent,
    MonthlyRecordsInfantComponent,
    ProfileTableComponent,
    FamilyProfileTableComponent,
    HomeComponent,
    QuarterlyTableComponent,
    NutritionalTableComponent
  ],


  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    SharedModule,
  ]
})
export class HomeModule { }
