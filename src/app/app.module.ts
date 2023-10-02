import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login/login.component';
import { BmiCalculatorComponent } from './bmicalculator/bmicalculator.component';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HomeComponent } from './home/home.component';
import { ChildrenInfoComponent } from './children-info/children-info.component';
import { HealthRecordsComponent } from './health-records/health-records.component';
import { MonthlyRecordComponent } from './monthly-record/monthly-record.component';
import { NutritionalStatusComponent } from './nutritional-status/nutritional-status.component';
import { FamilyProfileComponent } from './family-profile/family-profile.component';
import { QuarterlyRecordsComponent } from './quarterly-records/quarterly-records.component';
import { MonthlyWeightComponent } from './monthly-weight/monthly-weight.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    BmiCalculatorComponent,
    AboutComponent,
    ContactsComponent,
    CalendarComponent,
    HomeComponent,
    ChildrenInfoComponent,
    HealthRecordsComponent,
    MonthlyRecordComponent,
    NutritionalStatusComponent,
    FamilyProfileComponent,
    QuarterlyRecordsComponent,
    MonthlyWeightComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
