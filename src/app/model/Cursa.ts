import { Crianca } from "./Crianca";
import { Reforco } from "./Reforco";

export class Cursa {

    public id!: number;
    public statusCursa!: boolean;

    // FK
    public crianca!: Crianca;
    public reforco!: Reforco;

}