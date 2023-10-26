import { Cursa } from "./Cursa";
import { PagamentoPacote } from "./PagamentoPacote";
import { Proprietario } from "./Proprietario";
import { Responsavel } from "./Responsavel";

export class Crianca {
  [x: string]: any;

  public id!: number;

  public nome!: string;

  public dtNascimento!: Date;

  public genero!: string;

  public numeroPlanSaude!: string;

  public problemaSaude!: boolean;

  public tipoProblemaSaude!: string;

  public algumaAlergia!: boolean;

  public tipoAlergia!: string;

  public usoMedicamento!: boolean;

  public qualMedicamento!: string;

  public necessidadesEspeciais!: boolean;

  public tipoNecessidadesEspeciais!: string;

  public obsDiaCrianca!: string;

  public termoAceite!: boolean;

//FK
  public proprietario!: Proprietario;

  public responsavel!: Responsavel;

  public pagamentoPacote!: PagamentoPacote[];

  public cursa!: Cursa[];

}
