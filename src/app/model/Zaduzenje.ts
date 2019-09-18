import {Rezervacija} from 'src/app/model/Rezervacija'
export class Zaduzenje{
    idZaduzenje: number;
    datumZaduzenja: Date;
    rokZaPovratak: Date;
    DatumPovratka: Date;
    vracena: boolean;
    rezervacija: Rezervacija;
}