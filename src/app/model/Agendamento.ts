import { Time } from "@angular/common";
import { Contem } from "./Contem";

export class Agendamento {
    [x: string]: any;

    public id!: number;
    public dataAgendamento!: Date;
    public horarioEntrada!: Time;
    public horarioSaida!: Time;
    public status!: boolean;
    public observacao!: string;

    //FK
    public contem!: Contem[];
    
}

export interface AgendamentoContemRequest {
    agendamentoRequest: {
      agendar: Agendamento[];
    };
    contemRequest: {
      pacote: number;
    };
}