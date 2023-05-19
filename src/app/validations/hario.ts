import { AbstractControl, ValidationErrors } from "@angular/forms";

function horarioValidator(control: AbstractControl): ValidationErrors | null {
    const horarioPattern = /^\d{2}:\d{2}:\d{2}$/;
  
    if (!horarioPattern.test(control.value)) {
      return { formatoInvalido: true };
    }
  
    return null;
  }