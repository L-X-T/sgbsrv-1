import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { delay } from 'rxjs/operators';

import { Flight } from '../../entities/flight';
import { FlightService } from '../shared/services/flight.service';
import { validateCity } from '../shared/validation/city-validator';
import { validateRoundTrip } from '../shared/validation/round-trip-validator';

@Component({
  selector: 'flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.css']
})
export class FlightEditComponent implements OnChanges, OnInit {
  @Input() flight: Flight;

  @Output() flightChange = new EventEmitter<Flight>();
  debug = true;
  id: string;
  showDetails: string;

  editForm: FormGroup;

  message = '';

  private isInitialized: Boolean;

  constructor(private fb: FormBuilder, private flightService: FlightService, private route: ActivatedRoute, private router: Router) {}

  ngOnChanges(): void {
    if (!this.isInitialized) {
      this.editFormInit();
    }

    this.patchFormValue();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.showDetails = params['showDetails'];
    });

    this.editForm = this.fb.group({
      id: [1, [Validators.required]],
      from: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(15), validateCity(['Graz', 'Wien', 'Hamburg', 'Berlin'])]
      ],
      to: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(15), validateCity(['Graz', 'Wien', 'Hamburg', 'Berlin'])]
      ],
      date: ['', [Validators.required, Validators.minLength(33), Validators.maxLength(33)]]
    });

    if (!this.isInitialized) {
      this.editFormInit();
    }

    this.route.params.subscribe((params) => this.onRouteParams(params));
  }

  save(): void {
    this.message = 'Is saving ...';

    this.flightService
      .save(this.editForm.value)
      .pipe(delay(3000))
      .subscribe({
        next: (flight) => {
          // console.warn('FlightEditComponent - save()');
          // console.log(flight);

          // this.flight.date = flight.date;
          // this.flight.delayed = flight.delayed;
          // this.flight.from = flight.from;
          // this.flight.id = flight.id;
          // this.flight.to = flight.to;

          this.flightChange.emit(flight);

          this.flight = flight;
          this.message = 'Success saving! Navigating ...';
          this.patchFormValue();

          setTimeout(() => this.router.navigate(['/flight-search']), 3000);
        },
        error: (errResponse) => {
          console.error('Error', errResponse);
          this.message = 'Error saving!';
        }
      });
  }

  private editFormInit() {
    this.editForm = this.fb.group({
      id: [1, [Validators.required]],
      from: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15), validateCity]],
      to: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15), validateCity]],
      date: ['', [Validators.required, Validators.minLength(33), Validators.maxLength(33)]]
    });

    this.editForm.validator = validateRoundTrip;

    this.isInitialized = true;
  }

  private patchFormValue() {
    if (this.editForm && this.flight) {
      this.editForm.patchValue(this.flight);
    }
  }

  private onRouteParams(params: Params) {
    this.id = params['id'];
    this.showDetails = params['showDetails'];

    this.flightService.findById(this.id).subscribe({
      next: (flight) => {
        this.flight = flight;
        this.message = 'Success loading!';
        this.patchFormValue();
      },
      error: (err) => {
        this.message = 'Error Loading!';
      }
    });
  }
}
