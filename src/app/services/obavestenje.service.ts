import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Obavestenje} from 'src/app/model/Obavestenje';


@Injectable({
  providedIn: 'root'
})
export class ObavestenjeService {

  constructor(private http: HttpClient) { }
  getAll() : Observable<Array<Obavestenje>> {
    return this.http.get<Array<Obavestenje>>('/api/notifications');
  }
}
