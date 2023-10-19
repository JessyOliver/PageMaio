import { Crianca } from "./Crianca";
import { Pacote } from "./Pacote";

export class PagamentoPacote {

    public id!: number;

    public dataPagamento!: Date;

    public status!: boolean;

    public nome!: string;
    
    //FK
    public pacote!: Pacote;

    public crianca!: Crianca;
    
}