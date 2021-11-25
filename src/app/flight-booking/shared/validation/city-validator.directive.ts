import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: 'input[city]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CityValidatorDirective, multi: true }]
})
export class CityValidatorDirective implements Validator {
  // validCities: string[] = ['Graz', 'Hamburg'];

  @Input() city: string[];

  validate(c: AbstractControl): ValidationErrors | null {
    const value = c.value;

    console.log(value);

    if (!c.value || !this.city.includes(value)) {
      return {
        city: {
          actualCity: c.value,
          validCities: this.city
        }
      };
    }

    return null; // no error
  }
}
