import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminPermissions implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentUser') && JSON.parse(localStorage.getItem('currentUser').toString()).role === "ADMIN") {
      return true;
    }

    this.router.navigate(['/publikacije']);
    return false;
  }
}
