import { ValidatorFn, AbstractControl } from '@angular/forms';

// Função de validação personalizada para verificar o horário de agendamento
export function horarioValido(periodoDisponivel: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const horario = control.value;
  
      // Verifica se o horário está dentro do período disponível
      if (horario && obterPeriodo(horario) !== periodoDisponivel) {
        return { horarioInvalido: true };
      }
  
      return null;
    };
  }

// Função auxiliar para obter o período (manhã, tarde, noite) com base no horário
function obterPeriodo(horario: string): string {
  const hora = parseInt(horario.split(':')[0]);

  if (hora >= 6 && hora < 12) {
    return 'manhã';
  } else if (hora >= 12 && hora < 18) {
    return 'tarde';
  } else {
    return 'noite';
  }
}
