import { Component } from '@angular/core';

import { Flight } from '../../entities/flight';
import { FlightService } from '../shared/services/flight.service';
import { pattern } from '../../shared/global';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent {
  from = 'Graz';
  to = 'Hamburg';
  flights: Flight[] = [];
  flightToEdit: Flight;
  pattern = pattern;

  message: string;

  basket: Record<number, boolean> = {
    3: true,
    5: true
  };

  constructor(private flightService: FlightService) {}

  search(): void {
    this.flightService.find(this.from, this.to).subscribe({
      next: (flights) => {
        this.flights = flights;
      },
      error: (errResp) => {
        console.error('Error loading flights', errResp);
      }
    });
  }

  /*save(): void {
    this.flightService.save(this.flightToEdit).subscribe({
      next: (flight) => {
        this.flightToEdit = flight;
        this.message = 'Success!';
      },
      error: (errResponse) => {
        console.error('Error', errResponse);
        this.message = 'Error!';
      }
    });
  }*/

  updateFlight(updatedFlight: Flight): void {
    // console.warn('FlightSearchComponent - updateFlight()');
    // console.log(updatedFlight);

    this.flights = this.flights.map((flight) => (flight.id === updatedFlight.id ? updatedFlight : flight));
  }
}
