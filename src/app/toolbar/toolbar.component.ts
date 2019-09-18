
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authService/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

 
  isLoggedIn: Observable<boolean>;
  isAdmin: Observable<boolean>;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.isAdmin = this.authService.isAdmin;
  }

  logout() {
    this.authService.logOut();
    localStorage.removeItem('locale');
  }

  changeLang(lang: string) {
    localStorage.removeItem('locale');
    localStorage.setItem('locale', lang);
  }
}

