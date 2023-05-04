import { Agendamento } from "./Agendamento";
import { Pacote } from "./Pacote";

export class Contem {

    public id!: number;

    //FK
    public pacote!: Pacote;
    public agendamento!: Agendamento;
    
}