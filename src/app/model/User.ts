import { Proprietario } from "./Proprietario";
import { Responsavel } from "./Responsavel";

export class User {

  public id!: number;
  public usuario!: string;
  public tipo!: string;
  public senha!: string;

  //FK
  public proprietario!: Proprietario[];

  public responsavel!: Responsavel[];

}

