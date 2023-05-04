import { Responsavel } from "./Responsavel";

export class SegundoResponsavel {

    public id!: number;
  
    public nome!: string;
  
    public dtNascimento!: Date;
  
    public genero!: string;
  
    public cpf!: string;

    public parentesco!: string;

    public celular!: string;

    public telefone!: string;

    public telefoneComercial!: string;

// FK
    public responsavel!: Responsavel;

}