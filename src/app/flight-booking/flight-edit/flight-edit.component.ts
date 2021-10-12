import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlightService } from '../flight-search/flight.service';
import { Flight } from '../../entities/flight';

@Component({
  selector: 'flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.css']
})
export class FlightEditComponent implements OnInit {
  @Input() flight: Flight;

  editForm: FormGroup;

  message = '';

  constructor(private fb: FormBuilder, private flightService: FlightService) {}

  ngOnChanges(): void {
    if (this.flight && this.editForm) {
      this.editForm.setValue({ ...this.flight });
    }
  }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      id: [1],
      from: [],
      to: [],
      date: []
    });
  }

  save(): void {
    this.flightService.save(this.editForm.value).subscribe({
      next: (flight) => {
        this.message = 'Success!';
      },
      error: (errResponse) => {
        console.error('Error', errResponse);
        this.message = 'Error!';
      }
    });
  }
}
