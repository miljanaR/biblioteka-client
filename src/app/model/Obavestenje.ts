import { User } from "./User";

export class Obavestenje{
    id: number;
    tip: string;
    tekst: string;
    datum: Date;
    user: User;
}