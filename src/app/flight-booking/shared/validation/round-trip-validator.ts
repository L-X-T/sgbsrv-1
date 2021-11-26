import { FormGroup, ValidationErrors } from '@angular/forms';

export function validateRoundTrip(formGroup: FormGroup): ValidationErrors | null {
  const fromCtrl = formGroup.controls['from'];
  const toCtrl = formGroup.controls['to'];

  if (!fromCtrl || !toCtrl) return null;

  if (fromCtrl.value === toCtrl.value) {
    return { roundTrip: true };
  }

  return null;
}
