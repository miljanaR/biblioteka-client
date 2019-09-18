import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authService/auth.service';
import { User } from 'src/app/model/User';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  user: User = new User();
  errorMessage: string;
  isLoggedIn: boolean;
  isAdmin: boolean;
  language: string ='sr';
  constructor(private authService: AuthService, private router: Router, 
    private langService: LanguageService) { }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe(data => {
      this.isLoggedIn = data;
      this.authService.isAdmin.subscribe(admin => {
        this.isAdmin = admin;
      })
    });

    if (this.isLoggedIn) {
      if (this.isAdmin) {
        this.router.navigate(['/pocetnaAdmin']);
      } else {
        this.router.navigate(['/publikacije']);
      }
    };
  }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })


  login(postData: { username: string, password: string }) {
    this.user = new User();
    this.user.username = postData.username;
    this.user.password = postData.password;
    this.authService.logIn(this.user)
      .subscribe(data => {
        localStorage.removeItem('locale');
        localStorage.setItem('locale', this.language);
        if (this.authService.isAdmin) {
          this.router.navigate(['/pocetnaAdmin']);
        } else {
          this.router.navigate(['/publikacije']);
        }
      }, err => {
        if(this.language == 'en'){
          this.errorMessage = "error :  Email or password is incorrect";}
        if(this.language == 'sr'){
          this.errorMessage = "greska :  Korisnicko ime ili lozinka nisu odgovarajuci.";}
      });
  }
  changeLang(lang: string) {
    this.language = lang;
  }
  getLanguage(){
    return this.language;
  }
}
