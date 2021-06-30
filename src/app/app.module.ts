import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FlightBookingModule } from './flight-booking/flight-booking.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [BrowserModule, HttpClientModule, FormsModule, FlightBookingModule],
  declarations: [AppComponent, SidebarComponent, NavbarComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
