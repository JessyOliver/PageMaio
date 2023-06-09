import { Cursa } from "./Cursa";
import { Pacote } from "./Pacote";
import { Proprietario } from "./Proprietario";
import { Responsavel } from "./Responsavel";

export class Crianca {

  public id!: number;

  public nome!: string;

  public dtNascimento!: Date;

  public genero!: string;

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

  public pacote!: Pacote;

  public cursa!: Cursa[];

}
