import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Zaduzenje } from 'src/app/model/Zaduzenje'
@Injectable({
  providedIn: 'root'
})
export class ZaduzenjeService {

  constructor(private http: HttpClient) { }
  save(idRezervacije: number) {
    return this.http.post('/api/loans', { 'idRezervacije': idRezervacije });
  }
  getAll(idKorisnik: number): Observable<Array<Zaduzenje>> {
    return this.http.get<Array<Zaduzenje>>('/api/loans?id=' + idKorisnik);
  }
  returnBook(idZaduzenje: number) {
    return this.http.put('/api/loans', { 'idZaduzenje': idZaduzenje });
  }
  get(idPrimerak: number): Observable<Zaduzenje> {
    return this.http.get<Zaduzenje>('/api/loans/' + idPrimerak);
  }
  getHistory(idKorisnik: number): Observable<Array<Zaduzenje>> {
    return this.http.get<Array<Zaduzenje>>('/api/loans/history?id=' + idKorisnik);
  }
  getForToday(): Observable<Array<Zaduzenje>> {
    return this.http.get<Array<Zaduzenje>>('/api/loans/today');
  }
  
}
