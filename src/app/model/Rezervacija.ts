import {User} from 'src/app/model/User'

export class Rezervacija {
    idRezervacija: number;
    datumRezervisanja: Date;
    datumIstekaRezervacije: Date;
    ostvarena: boolean;
    primerak: Primerak;
    user: User;
}