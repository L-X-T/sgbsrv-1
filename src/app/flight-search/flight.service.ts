import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Flight } from '../entities/flight';

@Injectable({ providedIn: 'root' })
export class FlightService {
  url = 'http://www.angular.at/api/flight';
  // url = 'https://demo.angulararchitects.io/api/Flight';

  constructor(private http: HttpClient) {}

  find(from: string, to: string): Observable<Flight[]> {
    const headers = new HttpHeaders().set('Accept', 'application/json');
    const params = new HttpParams().set('from', from).set('to', to);

    return this.http.get<Flight[]>(this.url, { headers, params });
  }

  save(flight: Flight): Observable<Flight> {
    const headers = new HttpHeaders().set('Accept', 'application/json');

    return this.http.post<Flight>(this.url, flight, { headers });
  }
}
