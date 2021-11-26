import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlightService } from '../flight-search/flight.service';
import { Flight } from '../../entities/flight';
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

  editForm: FormGroup;

  message = '';

  constructor(private fb: FormBuilder, private flightService: FlightService) {}

  ngOnChanges(): void {
    if (this.editForm && this.flight) {
      this.editForm.patchValue(this.flight);
    }
  }

  ngOnInit(): void {
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

    this.editForm.validator = validateRoundTrip;
  }

  save(): void {
    this.flightService.save(this.editForm.value).subscribe({
      next: (flight) => {
        // console.warn('FlightEditComponent - save()');
        // console.log(flight);

        // this.flight.date = flight.date;
        // this.flight.delayed = flight.delayed;
        // this.flight.from = flight.from;
        // this.flight.id = flight.id;
        // this.flight.to = flight.to;

        this.flightChange.emit(flight);

        this.message = 'Success!';
      },
      error: (errResponse) => {
        console.error('Error', errResponse);
        this.message = 'Error!';
      }
    });
  }
}
