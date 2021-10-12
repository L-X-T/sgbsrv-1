import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { FlightCardComponent } from './flight-card/flight-card.component';
import { FlightStatusToggleComponent } from './flight-status-toggle/flight-status-toggle.component';
import { FlightValidationErrorsComponent } from './flight-validation-errors/flight-validation-errors.component';
import { CityValidatorDirective } from './shared/validation/city-validator.directive';
import { AsyncCityValidatorDirective } from './shared/validation/async-city-validator.directive';
import { MultiFieldValidatorDirective } from './shared/validation/multi-field-validator.directive';
import { AsyncMultiFieldValidatorDirective } from './shared/validation/async-multi-field-validator.directive';

import { FlightEditComponent } from './flight-edit/flight-edit.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
  declarations: [
    FlightSearchComponent,
    FlightCardComponent,
    FlightStatusToggleComponent,
    FlightValidationErrorsComponent,
    CityValidatorDirective,
    AsyncCityValidatorDirective,
    MultiFieldValidatorDirective,
    AsyncMultiFieldValidatorDirective,
    FlightEditComponent
  ],
  providers: [],
  exports: [FlightSearchComponent]
})
export class FlightBookingModule {}
