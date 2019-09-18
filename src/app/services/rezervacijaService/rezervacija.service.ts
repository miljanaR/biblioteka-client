import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rezervacija } from 'src/app/model/Rezervacija'
@Injectable({
  providedIn: 'root'
})
export class RezervacijaService {

  constructor(private http: HttpClient) { }
  getAll(idKorisnik: number): Observable<Array<Rezervacija>> {
    return this.http.get<Array<Rezervacija>>('/api/reservations?id=' + idKorisnik);
  }
  save(id: number, idKorisnik: number) {
    return this.http.post('/api/reservations', { "primerakId": id, "idKorisnik": idKorisnik })
  }
  get(idPrimerak: number): Observable<Rezervacija> {
    return this.http.get<Rezervacija>('/api/reservations/' + idPrimerak);
  }
  getReservationsForToday(): Observable<Array<Rezervacija>>{
    return this.http.get<Array<Rezervacija>>('/api/reservations/today');
  }
}
