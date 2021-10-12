import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: 'input[city]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CityValidatorDirective, multi: true }]
})
export class CityValidatorDirective implements Validator {
  validCities: string[] = ['Graz', 'Hamburg'];

  validate(c: AbstractControl): ValidationErrors {
    const value = c.value;

    console.log(value);

    if (!this.validCities.includes(value)) return { city: true }; // error

    return {}; // no error
  }
}
