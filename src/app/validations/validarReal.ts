import { AbstractControl } from "@angular/forms";

export function validarReal(control: AbstractControl): { [key: string]: any } | null {
    
    const regex = /^[1-9]\d*(,\d{1,2})?$/; // Expressão regular para validar valores em reais
    const valor = control.value;
    const valido = regex.test(valor); // Verifica se o valor corresponde à expressão regular

    return valido ? null : { valorRealInvalido: true }; // Retorna um objeto com a chave "valorRealInvalido" caso o valor seja inválido

}