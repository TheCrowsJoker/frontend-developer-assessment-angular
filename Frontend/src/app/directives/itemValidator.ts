import { AbstractControl, ValidatorFn } from '@angular/forms';
import { forbiddenItems } from 'src/app/constants';

/**
 * Function to determine if a string contains any forbidden words
 */
export function itemValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null =>
    forbiddenItems.indexOf(control.value?.toLocaleLowerCase()) === -1
      ? null
      : { disallowed: control.value };
}
