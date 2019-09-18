import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublikacijaServiceService {

  constructor(private http: HttpClient) { }
  getAll(autor: String, isbn: String, nazivPublikacije: String): Observable<Array<Publikacija>> {
    return this.http.get<Array<Publikacija>>('/api/publications/search?autor=' + autor + '&isbn=' + isbn + '&nazivPublikacije=' + nazivPublikacije);
  }
  get(isbn: string): Observable<Publikacija> {
    return this.http.get<Publikacija>('/api/publications/' + isbn);
  }
}
