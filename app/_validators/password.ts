import {AbstractControl} from '@angular/forms';

export function passwordValidator(control: AbstractControl): {[key: string]: boolean} | null {
  const pass = control.get('pass');
  const confirmPass = control.get('confirmPass');
  if (pass.pristine || confirmPass.pristine) {
    return null;
  }
  return pass && confirmPass && pass.value !== confirmPass.value ? {misMatch: true} : null;
}
