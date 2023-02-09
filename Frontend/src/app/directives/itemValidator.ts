import { AbstractControl, ValidatorFn } from '@angular/forms';
import { forbiddenItems } from 'src/app/constants';

/**
 * Function to determine if a string contains any forbidden words
 */
export function itemValidator(): ValidatorFn {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (control: AbstractControl): { [key: string]: any } | null =>
    forbiddenItems.indexOf(control.value?.toLocaleLowerCase()) === -1
      ? null
      : { disallowed: control.value };
}
