import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login/login.component';
import { BmiCalculatorComponent } from './bmicalculator/bmicalculator.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ChildrenInfoComponent } from './children-info/children-info.component';
import { HealthRecordsComponent } from './health-records/health-records.component';
import { MonthlyRecordComponent } from './monthly-record/monthly-record.component';
import { NutritionalStatusComponent } from './nutritional-status/nutritional-status.component';
import { FamilyProfileComponent } from './family-profile/family-profile.component';
import { QuarterlyRecordsComponent } from './quarterly-records/quarterly-records.component';
import { MonthlyWeightComponent } from './monthly-weight/monthly-weight.component';

const routes: Routes = [
  {path:'', component:LoginFormComponent},
  {path:'bmi', component:BmiCalculatorComponent},
  {path: 'home', component:HomeComponent},
  {path: 'about', component:AboutComponent},
  {path: 'contacts', component:ContactsComponent},
  {path: 'calendar', component:CalendarComponent},
  {path: 'childreninfo', component:ChildrenInfoComponent},
  {path: 'healthrecords', component:HealthRecordsComponent},
  {path: 'monthlyrecords', component:MonthlyRecordComponent},
  {path: 'nutritionalstatus', component:NutritionalStatusComponent},
  {path: 'familyprofile', component:FamilyProfileComponent},
  {path: 'quarterlyrecords', component:QuarterlyRecordsComponent},
  {path: 'monthlyweight', component:MonthlyWeightComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
