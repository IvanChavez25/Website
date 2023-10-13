import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HomeComponent } from './home/home.component';
import { LandingpageComponent } from './landingpage.component';


const routes: Routes = [
  {
    path: 'page', component: LandingpageComponent,
    children: [
      {
        path: 'about', component: AboutComponent
      },
      {
        path: 'calendar', component: CalendarComponent
      },
      {
        path: 'contacts', component: ContactsComponent
      },
      {
        path: 'home', component: HomeComponent
      }
    ]
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingpageRoutingModule { }
