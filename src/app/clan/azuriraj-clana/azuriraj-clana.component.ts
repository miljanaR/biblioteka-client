import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FakultetService } from 'src/app/services/fakultetService/fakultet.service';
import { GradService } from 'src/app/services/gradService/grad.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClanService } from 'src/app/services/clanService/clan.service';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/services/authService/auth.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-azuriraj-clana',
  templateUrl: './azuriraj-clana.component.html',
  styleUrls: ['./azuriraj-clana.component.css']
})
export class AzurirajClanaComponent implements OnInit {
  fakulteti: Array<any>;
  gradovi: Array<any>;
  clan: User;
  public errorMes;
  poruka: string;
  prikazi = true;
  profileForm = new FormGroup({
    idKorisnik: new FormControl(''),
    imePrezime: new FormControl('', Validators.required),
    idFakultet: new FormControl('', Validators.required),
    postanskiBroj: new FormControl('', Validators.required),
    datumRodjenja: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
  });
  constructor(private http: HttpClient, private fakultetService: FakultetService, private gradService: GradService, private langService: LanguageService,
    private clanService: ClanService, private router: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    let id = parseInt(this.router.snapshot.paramMap.get('id'));

    this.clanService.get(id).subscribe(
      data => {
        this.clan = data.body;
        let datumRodjenja = new Date(data.body.datumRodjenja);
        this.profileForm.controls['idKorisnik'].setValue(data.body.idKorisnika);
        this.profileForm.controls['imePrezime'].setValue(data.body.imePrezime);
        this.profileForm.controls['username'].setValue(data.body.username);
        this.profileForm.controls['idFakultet'].setValue(data.body.fakultet.idFakultet);
        this.profileForm.controls['postanskiBroj'].setValue(data.body.grad.postanskiBroj);
        this.profileForm.controls['datumRodjenja'].setValue(datumRodjenja.getFullYear() + '-' + ('0' + (datumRodjenja.getMonth() + 1)).slice(-2) + '-' + ('0' + datumRodjenja.getDate()).slice(-2));
      },
      error => {
        this.errorMes = error;
        if (error.status == 404) {
          this.poruka = "Clan sa zadatim clanskim brojem ne postoji";
          if(this.langService.getLanguage() == 'en'){this.poruka="User does not exist."}
          this.prikazi = false;
        }
      }
    );

    this.fakultetService.getAll().subscribe(
      data => {
        this.fakulteti = data;
      });

    this.gradService.getAll().subscribe(
      data => {
        this.gradovi = data;
      });
  }

  onSubmit(postData: { firstName: string }) {
    this.http.put('/api/users', postData).subscribe(responseData => {
      if (this.profileForm.valid) {
        this.profileForm.reset();
        this._router.navigate(["/clanovi"]);
      }
    });
  }
}