import { AbstractControl, ValidatorFn } from '@angular/forms';

export function cnpjValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const cnpj = control.value;
    const cnpjValido = validarCNPJ(cnpj);

    return cnpjValido ? null : { cnpjInvalido: true };
  };
}

function validarCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/\D/g, '');

  if (cnpj.length !== 14) {
    return false;
  }

  if (/^(\d)\1+$/.test(cnpj)) {
    return false;
  }

  var tamanho = cnpj.length - 2;
  var numeros = cnpj.substring(0, tamanho);
  var digitos = cnpj.substring(tamanho);
  var soma = 0;
  var pos = tamanho - 7;

  for (var i = tamanho; i >= 1; i--) {
    soma += +numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  var resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

  if (+resultado !== +digitos.charAt(0)) {
    return false;
  }

  tamanho += 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (var i = tamanho; i >= 1; i--) {
    soma += +numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

  if (+resultado !== +digitos.charAt(1)) {
    return false;
  }

  return true;
}
