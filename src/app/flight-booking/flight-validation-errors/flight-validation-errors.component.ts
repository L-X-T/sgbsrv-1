import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'flight-validation-errors',
  templateUrl: './flight-validation-errors.component.html',
  styleUrls: ['./flight-validation-errors.component.css']
})
export class FlightValidationErrorsComponent {
  @Input() errors: ValidationErrors | null;
  @Input() fieldLabel = '';
}
