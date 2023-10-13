import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthlyDropdownComponent } from './monthly-dropdown/monthly-dropdown.component';
import { HomeRoutingModule } from '../home/home-routing.module';
import { ProfileDropdownComponent } from './profile-dropdown/profile-dropdown.component';




@NgModule({
  declarations: [
    MonthlyDropdownComponent,
    ProfileDropdownComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
  ],
  exports:[MonthlyDropdownComponent, ProfileDropdownComponent],
  
})
export class SharedModule { }
