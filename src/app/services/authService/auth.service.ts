import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  private admin = new BehaviorSubject<boolean>(false);

  constructor(public http: Http, private router: Router) { }

  public logIn(user: User) {

    let headers = new Headers();
    headers.append('Accept', 'application/json')
    var base64Credential: string = btoa(user.username + ':' + user.password);
    headers.append("Authorization", "Basic " + base64Credential);

    let options = new RequestOptions();
    options.headers = headers;

    return this.http.get("/api/login", options).pipe(
      map((response: Response) => {
        let user = response.json().principal;
        if (user) {
          user.authdata = base64Credential;
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('loginTime', new Date().toString());
          this.loggedIn.next(true);
          this.admin.next(user.role === "ADMIN");
        }
      }));
  }

  logOut() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('loginTime');
    this.loggedIn.next(false);
    this.admin.next(false);
    this.router.navigate(['/']);
  }

  public get currentUserValue(): User {
    return JSON.parse(localStorage.getItem('currentUser').toString());
  }

  public get isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      this.loggedIn.next(true);
    }
    return this.loggedIn.asObservable();
  }

  public get isAdmin() {
    if (localStorage.getItem('currentUser') && JSON.parse(localStorage.getItem('currentUser').toString()).role === "ADMIN") {
      this.admin.next(true);
    }
    return this.admin.asObservable();
  }
  public getVremePristupa():Date{
    return new Date( localStorage.getItem('loginTime') );
  }
}
