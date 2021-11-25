import { Directive } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: 'form[roundTrip]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MultiFieldValidatorDirective, multi: true }]
})
export class MultiFieldValidatorDirective {
  validate(c: AbstractControl): ValidationErrors | null {
    const group: FormGroup = c as FormGroup; // type cast

    const fromCtrl = group.controls['from'];
    const toCtrl = group.controls['to'];

    if (!fromCtrl || !toCtrl) return null;

    if (fromCtrl.value === toCtrl.value) {
      return {
        roundTrip: true
      };
    }

    return null;
  }
}
