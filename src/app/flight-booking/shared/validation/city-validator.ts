import { AbstractControl } from '@angular/forms';

export function validateCity(c: AbstractControl) {
  const validCities: string[] = ['Graz', 'Wien', 'Hamburg', 'Berlin'];
  if (c.value && validCities.indexOf(c.value) === -1) {
    return {
      city: {
        actualValue: c.value,
        validCities: validCities
      }
    };
  }

  return null;
}
