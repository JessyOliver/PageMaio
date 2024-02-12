import { Contem } from "./Contem";
import { PagamentoPacote } from "./PagamentoPacote";

export class Pacote {
    [x: string]: any;

    public id!: number;
    public valorPacote!: number;
    public valorPeriodo!: number;
    public qtdDias!: number;
    public tipoPacote!: string;
    public periodo!: string;

    // FK
    public pagamentoPacote!: PagamentoPacote[];
    
    public contem!: Contem[];

}