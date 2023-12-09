import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './page/login/login.component';
import { HomeComponent } from './home/home.component';
import {AuthLoginGuard} from './page/login/auth-login.guard'//ays na
import { LandingPageComponent } from './page/landing-page/landing-page.component';
import { AboutComponent } from './page/about/about.component';


const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginFormComponent,
    canActivate: [AuthLoginGuard] 

  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: '',
    component: LandingPageComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
