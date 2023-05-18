import { AbstractControl } from "@angular/forms";

export class Validacoes {

  static ValidaCpf(controle: AbstractControl) {
   
    const cpf = controle.value.replace(/[^\d]+/g,'');

    if (cpf == '') {
      return { cpfInvalido: true };
    }
    // Elimina CPFs invalidos conhecidos
    if (cpf.length != 11 || 
      cpf == "00000000000" || 
      cpf == "11111111111" || 
      cpf == "22222222222" || 
      cpf == "33333333333" || 
      cpf == "44444444444" || 
      cpf == "55555555555" || 
      cpf == "66666666666" || 
      cpf == "77777777777" || 
      cpf == "88888888888" || 
      cpf == "99999999999") {
        return { cpfInvalido: true };
    }
    // Valida 1o digito verificador
    let add = 0;
    for (let i=0; i < 9; i ++) {
      add += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) {
      rev = 0;
    }
    if (rev != parseInt(cpf.charAt(9))) {
      return { cpfInvalido: true };
    }
    // Valida 2o digito verificador
    add = 0;
    for (let i = 0; i < 10; i ++) {
      add += parseInt(cpf.charAt(i)) * (11 - i);
    }
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) {
      rev = 0;
    }
    if (rev != parseInt(cpf.charAt(10))) {
      return { cpfInvalido: true };
    }

    return null;
    
  }

  static MaiorQue18Anos(controle: AbstractControl) {
    const nascimento = controle.value;
    const [ano, mes, dia] = nascimento.split('-');
    const hoje = new Date();
    const dataNascimento = new Date(ano, mes, dia, 0, 0, 0);
    const tempoParaTeste = 1000 * 60 * 60 * 24 * 365 * 18; //18 anos em mili segundos...

    if (hoje.getTime() - dataNascimento.getTime() >= tempoParaTeste)
      return null;

    return { menorDeIdade: true };
  }
  
  static Maiorde12Anos(controle: AbstractControl) {

    let birthday = new Date(controle.value);
    let today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    let monthDiff = today.getMonth() - birthday.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
      age--;
    }
    if (age >= 3 && age <= 13) {
      return null;
    }
    return { overage: true };

  }

  
  

 /*  static SenhasCombinam(controle: AbstractControl) {
    let senha = controle.get('senha').value;
    let confirmarSenha = controle.get('confirmarSenha').value;

    if (senha === confirmarSenha) return null;

    controle.get('confirmarSenha').setErrors({ senhasNaoCoincidem: true });
  } */

}
