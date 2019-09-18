import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FakultetService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<any> {
    return this.http.get('/api/faculties');
  }
}
