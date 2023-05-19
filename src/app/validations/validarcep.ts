import { AbstractControl, ValidatorFn } from '@angular/forms';

export function cepValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const cep = control.value;
    const cepValido = validarCEP(cep);

    return cepValido ? null : { cepInvalido: true };
  };
}

function validarCEP(cep: string): boolean {
  cep = cep.replace(/\D/g, '');

  if (cep.length !== 8) {
    return false;
  }

  const regex = /^[0-9]{5}-?[0-9]{3}$/;

  return regex.test(cep);
}
