import { Cursa } from "./Cursa";

export class Reforco {

    public id!: number;
    public materias!: string;
    public periodoCurso!: string;
    public nivelEstudos!: string;

    // FK
    public cursa!: Cursa[];

}