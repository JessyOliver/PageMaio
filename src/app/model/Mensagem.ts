import { Proprietario } from "./Proprietario";
import { Responsavel } from "./Responsavel";

export class Mensagem {

    public id!: number;
    public titulo!: string;
    public conteudoMensagem!: string;

    // FK
    public proprietario!: Proprietario;
    public responsavel!: Responsavel;

}