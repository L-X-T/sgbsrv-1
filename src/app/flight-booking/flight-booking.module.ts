import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { FlightCardComponent } from './flight-card/flight-card.component';
import { FlightStatusToggleComponent } from './flight-status-toggle/flight-status-toggle.component';

@NgModule({
  imports: [CommonModule, FormsModule, SharedModule],
  declarations: [FlightSearchComponent, FlightCardComponent, FlightStatusToggleComponent],
  providers: [],
  exports: [FlightSearchComponent]
})
export class FlightBookingModule {}