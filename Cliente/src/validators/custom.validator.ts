import { AbstractControl } from "@angular/forms";
import * as moment from "moment";

export class CustomValidator {
  static dateValidator(AbstractControl: AbstractControl) {
    if (
      AbstractControl &&
      AbstractControl.value &&
      !moment(AbstractControl.value, "DD/MM/YYYY", true).isValid()
    ) {
      return { dateValidator: true };
    }
    return null;
  }
}
