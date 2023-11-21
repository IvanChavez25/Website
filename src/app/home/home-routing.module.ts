import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildrenInfoComponent } from './children-info/children-info.component';
import { MonthlyRecordComponent } from './monthly-record/monthly-record.component';
import { NutritionalStatusComponent } from './nutritional-status/nutritional-status.component';
import { FamilyProfileComponent } from './family-profile/family-profile.component';
import { QuarterlyRecordsComponent } from './quarterly-records/quarterly-records.component';
import { MonthlyWeightComponent } from './monthly-weight/monthly-weight.component';
import { MonthlyRecordInfantComponent } from './monthly-record-infant/monthly-record-infant.component';
import { BaselineWeightComponent } from './baseline-weight/baseline-weight.component';
import { BWIRTableComponent } from './bwir-table/bwir-table.component';
import { MonthlyHeightRecordsTableComponent } from './monthly-height-records-table/monthly-height-records-table.component';
import { MonthlyWeightRecordsTableComponent } from './monthly-weight-records-table/monthly-weight-records-table.component';
import { MonthlyRecordsInfantComponent } from './monthly-records-infant/monthly-records-infant.component';
import { ProfileTableComponent } from './profile-table/profile-table.component';
import { FamilyProfileTableComponent } from './family-profile-table/family-profile-table.component';
import { BmiCalculatorComponent } from './bmicalculator/bmicalculator.component';
import { HomeComponent } from './home.component';
import { QuarterlyTableComponent } from './quarterly-table/quarterly-table.component';
import { NutritionalTableComponent } from './nutritional-table/nutritional-table.component';
import { BMIResultComponent } from './bmi-result/bmi-result.component';
import { BarangayRankingbmiComponent } from './barangay-rankingbmi/barangay-rankingbmi.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NutritionalStatusSummaryComponent } from './nutritional-status-summary/nutritional-status-summary.component';
import { NutritionalStatusSummaryHeightforageComponent } from './nutritional-status-summary-heightforage/nutritional-status-summary-heightforage.component';
import { NutritionalStatusSummaryWeightforheightComponent } from './nutritional-status-summary-weightforheight/nutritional-status-summary-weightforheight.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { UserlistComponent } from './userlist/userlist.component';
import { authGuard } from '../page/login/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
 canActivate: [authGuard],
    children: [
      { path: 'childreninfo', component: ChildrenInfoComponent },
      { path: 'monthlyrecords', component: MonthlyRecordComponent },
      { path: 'nutritionalstatus', component: NutritionalStatusComponent },
      { path: 'familyprofile', component: FamilyProfileComponent },
      { path: 'quarterlyrecords', component: QuarterlyRecordsComponent },
      { path: 'monthlyweight', component: MonthlyWeightComponent },
      { path: 'monthlyrecordsinfant', component: MonthlyRecordInfantComponent },
      { path: 'baselineweight', component: BaselineWeightComponent },
      { path: 'bwirtable', component: BWIRTableComponent },
      {
        path: 'monthlyheightrecordstable',
        component: MonthlyHeightRecordsTableComponent,
      },
      {
        path: 'monthlyweightrecordstable',
        component: MonthlyWeightRecordsTableComponent,
      },
      {
        path: 'monthlyrecordsinfanttable',
        component: MonthlyRecordsInfantComponent,
      },
      { path: 'profiletable', component: ProfileTableComponent },
      { path: 'familyprofiletable', component: FamilyProfileTableComponent },
      { path: 'bmi', component: BmiCalculatorComponent },
      { path: 'quarterlytable', component: QuarterlyTableComponent },
      { path: 'nutritionaltable', component: NutritionalTableComponent },
      { path: 'bmiresult', component: BMIResultComponent },
      { path: 'rankingbmi', component: BarangayRankingbmiComponent },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'nutritionalsummary',
        component: NutritionalStatusSummaryComponent,
      },
      {
        path: 'nutritionalsummaryheight',
        component: NutritionalStatusSummaryHeightforageComponent,
      },
      {
        path: 'nutritionalsummaryweight',
        component: NutritionalStatusSummaryWeightforheightComponent,
      },
      { path: 'useraccount', component: UserAccountComponent },
      { path: 'userlist', component: UserlistComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
