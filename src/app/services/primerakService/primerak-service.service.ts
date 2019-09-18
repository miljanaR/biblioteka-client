import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PrimerakServiceService {

  constructor(private http: HttpClient) { }
  getAll(isbn: string): Observable<Array<Primerak>> {
    return this.http.get<Array<Primerak>>('/api/copies?isbn=' + isbn);
  }
}
