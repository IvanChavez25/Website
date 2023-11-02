import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthlyDropdownComponent } from './monthly-dropdown/monthly-dropdown.component';
import { HomeRoutingModule } from '../home/home-routing.module';
import { ProfileDropdownComponent } from './profile-dropdown/profile-dropdown.component';
import { NutritionalDropdownComponent } from './nutritional-dropdown/nutritional-dropdown.component';

@NgModule({
  declarations: [
    MonthlyDropdownComponent,
    ProfileDropdownComponent,
    NutritionalDropdownComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
  ],
  exports:[MonthlyDropdownComponent, ProfileDropdownComponent, NutritionalDropdownComponent],
  
})
export class SharedModule { }
