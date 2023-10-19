import { Crianca } from "./Crianca";

export class PagamentoStatusResponse {

  public mensagem!: string;
  public corNomeCrianca!: string;
  public dtPagamento!: Date;

   // FK
   public crianca!: Crianca;
}
