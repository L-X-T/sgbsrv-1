import { FormGroup } from '@angular/forms';

export function validateRoundTrip(formGroup: FormGroup): object {
  let fromCtrl = formGroup.controls['from'];
  let toCtrl = formGroup.controls['to'];

  if (!fromCtrl || !toCtrl) return null;

  if (fromCtrl.value === toCtrl.value) {
    return { roundTrip: true };
  }

  return null;
}
