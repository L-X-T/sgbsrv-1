import { Directive, Input } from '@angular/core';
import { AbstractControl, FormGroup, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { FlightService } from '../services/flight.service';

@Directive({
  selector: 'form[asyncMulti]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: AsyncMultiFieldValidatorDirective,
      multi: true
    }
  ]
})
export class AsyncMultiFieldValidatorDirective {
  @Input() asyncMulti: string[];

  constructor(private flightService: FlightService) {}

  validate(c: AbstractControl): Observable<ValidationErrors | null> {
    if (this.asyncMulti?.length !== 2) {
      return of(null);
    }

    const group: FormGroup = c as FormGroup; // type cast

    const from = group.controls[this.asyncMulti[0]]?.value;
    const to = group.controls[this.asyncMulti[1]]?.value;

    if (!from || !to) of(null);

    return this.flightService.find(from, to).pipe(
      map((flights) => (flights.length > 0 ? null : { asyncMulti: true, from, to })),
      delay(2000) // <-- delay; can be removed later...
    );
  }
}
