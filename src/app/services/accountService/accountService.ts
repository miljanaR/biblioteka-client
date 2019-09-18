import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
//import { User } from 'src/app/model/User';
import { map } from 'rxjs/operators';
import { User } from 'src/app/model/User'
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(public http: Http) { }

  createAccount(user: User) {
    return this.http.post("/api/register", user).pipe(
      map(resp => resp.json()));
  }
}
