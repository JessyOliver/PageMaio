import { FormControl } from '@angular/forms';

export class CustomValidators {
  static horaValidator(control: FormControl) {
    const value = control.value;

    // Verifica se o valor é uma hora válida
    if (!CustomValidators.isValidTime(value)) {
      return { invalidHora: true };
    }

    // Retorna nulo se a validação for bem-sucedida
    return null;
  }

  private static isValidTime(value: any): boolean {
    // Implemente a lógica para validar somente a hora aqui
    // Por exemplo, você pode usar expressões regulares para validar o formato de hora

    // Exemplo de validação com expressão regular (HH:mm)
    const timeRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
    return timeRegex.test(value);
  }
}
