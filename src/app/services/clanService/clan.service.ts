import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/model/User'


@Injectable({
  providedIn: 'root'
})
@Injectable()
export class ClanService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<User>> {
    return this.http.get<Array<User>>('/api/users');
  }

  get(id: number): Observable<HttpResponse<User>> {
    return this.http.get<User>('/api/users/' + id, { observe: 'response' });
  }
}
