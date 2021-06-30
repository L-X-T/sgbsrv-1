import { Component, OnInit } from '@angular/core';

import { Flight } from '../entities/flight';
import { FlightService } from './flight.service';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {
  from = 'Graz';
  to = 'Hamburg';
  flights: Flight[] = [];
  selectedFlight: Flight;

  message: string;

  constructor(private flightService: FlightService) {}

  ngOnInit(): void {}

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

  select(f: Flight): void {
    this.selectedFlight = f;
  }

  save(): void {
    this.flightService.save(this.selectedFlight).subscribe({
      next: (flight) => {
        this.selectedFlight = flight;
        this.message = 'Success!';
      },
      error: (errResponse) => {
        console.error('Error', errResponse);
        this.message = 'Error!';
      }
    });
  }
}
