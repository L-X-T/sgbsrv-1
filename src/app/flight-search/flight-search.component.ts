import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Flight } from '../entities/flight';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {
  from: string;
  to: string;
  flights: Array<Flight> = [];
  selectedFlight: Flight;

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  search(): void {
    let url = 'http://www.angular.at/api/flight';

    let headers = new HttpHeaders().set('Accept', 'application/json');

    let params = new HttpParams().set('from', this.from).set('to', this.to);

    this.http.get<Flight[]>(url, { headers, params }).subscribe({
      next: (flights: Flight[]) => {
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
}
