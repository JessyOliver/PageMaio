import { Crianca } from "./Crianca";
import { Mensagem } from "./Mensagem";
import { User } from "./User";

export class Proprietario {
  
  public id!: number;

  public nome!: string;

  public cnpj!: string;

  //FK-DB
  public usuario!: User;

  public crianca!: Crianca[];

  public mensagem!: Mensagem[];

}
