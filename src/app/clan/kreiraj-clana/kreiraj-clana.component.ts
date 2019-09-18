import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FakultetService } from 'src/app/services/fakultetService/fakultet.service';
import { GradService } from 'src/app/services/gradService/grad.service';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/accountService/accountService';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-kreiraj-clana',
  templateUrl: './kreiraj-clana.component.html',
  styleUrls: ['./kreiraj-clana.component.css']
})
export class KreirajClanaComponent implements OnInit {
  fakulteti: Array<any>;
  gradovi: Array<any>;
  message: string;
  language: string;
  constructor(private http: HttpClient, private fakultetService: FakultetService, private gradService: GradService, 
    private langService: LanguageService, private _router: Router, public accountService: AccountService) { }
  ngOnInit() {
    this.fakultetService.getAll().subscribe(
      data => {
        this.fakulteti = data;
      });
    this.gradService.getAll().subscribe(
      data => {
        this.gradovi = data;
      });
      this.language= this.langService.getLanguage();
  }

  profileForm = new FormGroup({
    imePrezime: new FormControl('', Validators.required),
    idFakultet: new FormControl('', Validators.required),
    postanskiBroj: new FormControl('', Validators.required),
    datumRodjenja: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    username: new FormControl('', Validators.email),
  });

  register(postData: { imePrezime: string, idFakultet: number }) {
    this.http.post("/api/register", postData).subscribe(data => {
      this._router.navigate(['/clanovi']);
    }, error => {
      if (error.status == 409) {
        this.message = "Korisnik sa navedenim email-om vec postoji.";
        if(this.language == 'en') { this.message = "User with this email already exists";}
      }
    }
    )
  }

}

