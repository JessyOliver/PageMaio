import { Contem } from "./Contem";
import { Crianca } from "./Crianca";

export class Pacote {
    [x: string]: any;

    public id!: number;
    public valorPacote!: number;
    public valorPeriodo!: number;
    public qtdDias!: number;
    public tipoPacote!: string;
    public periodo!: string;

    // FK
    public crianca!: Crianca[];
    
    public contem!: Contem[];

}