import { Time } from "@angular/common";
import { Contem } from "./Contem";

export class Agendamento {

    public id!: number;
    public dataAgendamento!: Date;
    public horarioEntrada!: Time;
    public horarioSaida!: Time;
    public status!: boolean;
    public observacao!: string;

    //FK
    public contem!: Contem[];
    
}