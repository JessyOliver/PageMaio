export interface CriancaPacoteData {

//CRIANÇA
    criancaId: number;
    nome: string;
    dtNascimento: Date;
    genero: string;

//PACOTE
    pacoteId: number;
    tipoPacote: string;
    periodo: string;
    valorPacote: number;
    qtdDias: number;

}