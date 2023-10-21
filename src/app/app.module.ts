import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './page/login/login.component';
import { FormsModule } from '@angular/forms';

import { HomeModule } from './home/home.module';
import { LandingpageModule } from './landingpage/landingpage.module';
import { LandingpageRoutingModule } from './landingpage/landingpage-routing.module';
import { HomeRoutingModule } from './home/home-routing.module';
import { SharedModule } from './shared/shared.module';
import { environment } from 'src/environtment/environtment';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

@NgModule({
  declarations: [AppComponent, LoginFormComponent,],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HomeModule,
    LandingpageModule,
    LandingpageRoutingModule,
    HomeRoutingModule,
    SharedModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
