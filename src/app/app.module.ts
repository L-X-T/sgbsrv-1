import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FlightBookingModule } from './flight-booking/flight-booking.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';

import { APP_ROUTES } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    FlightBookingModule,
    RouterModule.forRoot(
      APP_ROUTES
      // { useHash: true, enableTracing: true }
    )
  ],
  declarations: [AppComponent, SidebarComponent, NavbarComponent, HomeComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
