import { Crianca } from "./Crianca";
import { Mensagem } from "./Mensagem";
import { SegundoResponsavel } from "./SegundoResponsavel";
import { User } from "./User";

export class Responsavel {

  public id!: number;

  public nome!: string;

  public dtNascimento!: Date;

  public genero!: string;

  public cpf!: string;

  public cep!: string;

  public rua!: string;

  public numMoradia!: string;

  public bairro!: string;

  public complemento!: string;

  public cidade!: string;

  public estado!: string;

  public celular!: string;

  public telefone!: string;

  public telefoneComercial!: string;

//FK
  public usuario!: User;

  public crianca!: Crianca[];

  public segundoResponsavel!: SegundoResponsavel[];

  public mensagem!: Mensagem[];

}
