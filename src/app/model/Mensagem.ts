import { Proprietario } from "./Proprietario";

export class Mensagem {

    public id!: number;
    public titulo!: string;
    public conteudoMensagem!: string;

    // FK
    public proprietario!: Proprietario;
    public responsavel!: Response;

}