import { Sud } from "./sud";

export class Predmet {
    id!: number;
    brojPr!: string;
    opis!: string;
    datum_pocetka!: Date;
    aktivan!: boolean;
    sud!: Sud;
}