import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RezervacijaService } from 'src/app/services/rezervacijaService/rezervacija.service';
import { ZaduzenjeService } from 'src/app/services/zaduzenjeService/zaduzenje.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-zaduzi-primerak',
  templateUrl: './zaduzi-primerak.component.html',
  styleUrls: ['./zaduzi-primerak.component.css']
})
export class ZaduziPrimerakComponent implements OnInit {
  primerakForm = new FormGroup({
    id: new FormControl('', Validators.required)
  });
  rezervacijaForm = new FormGroup({
    isbn: new FormControl(''),
    autor: new FormControl(''),
    jezik: new FormControl(''),
    nazivPublikacije: new FormControl(''),
    godinaIzdanja: new FormControl(''),
    datumStampe: new FormControl(''),
  });
  rezervacijaForm2 = new FormGroup({
    idRezervacija: new FormControl(''),
    datumRezervisanja: new FormControl(''),
    datumIstekaRezervacije: new FormControl(''),
  });
  rezervacijaForm3 = new FormGroup({
    idKorisnik: new FormControl(''),
    imePrezime: new FormControl(''),
    datumRodjenja: new FormControl(''),
    grad: new FormControl(''),
    fakultet: new FormControl(''),
  });
  prikaz = false;
  poruka: string;
  state: number;
  language: string;
  onlyForView: boolean = false;
  constructor(private rezervacijaService: RezervacijaService, private zaduzenjeService: ZaduzenjeService, 
    private langService: LanguageService, public activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.language= this.langService.getLanguage();
    this.activatedRoute.paramMap
      .pipe(map(() => window.history.state.id)).subscribe(data => { this.state = data; })
    if (this.state != null) {
      this.onSubmit(this.state);
      this.onlyForView = true;
    }
  }

  onSubmit(id: number) {
    this.rezervacijaService.get(id).subscribe(
      data => {
        this.prikaz = true;
        this.poruka = "";
        let datumStampe = new Date(data.primerak.datumStampe);
        let datumRezervisanja = new Date(data.datumRezervisanja);
        let datumIstekaRezervacije = new Date(data.datumIstekaRezervacije);
        let datumRodjenja = new Date(data.user.datumRodjenja);
        this.rezervacijaForm.controls['isbn'].setValue(data.primerak.publikacija.isbn);
        this.rezervacijaForm.controls['autor'].setValue(data.primerak.publikacija.autor);
        this.rezervacijaForm.controls['jezik'].setValue(data.primerak.publikacija.jezik.nazivJezika);
        this.rezervacijaForm.controls['nazivPublikacije'].setValue(data.primerak.publikacija.nazivPublikacije);
        this.rezervacijaForm.controls['godinaIzdanja'].setValue(data.primerak.publikacija.godinaIzdanja);
        this.rezervacijaForm.controls['datumStampe'].setValue(datumStampe.getFullYear() + '-' + ('0' + (datumStampe.getMonth() + 1)).slice(-2) + '-' + ('0' + datumStampe.getDate()).slice(-2));
        this.rezervacijaForm2.controls['idRezervacija'].setValue(data.idRezervacija);
        this.rezervacijaForm2.controls['datumRezervisanja'].setValue(datumRezervisanja.getFullYear() + '-' + ('0' + (datumRezervisanja.getMonth() + 1)).slice(-2) + '-' + ('0' + datumRezervisanja.getDate()).slice(-2));
        this.rezervacijaForm2.controls['datumIstekaRezervacije'].setValue(datumIstekaRezervacije.getFullYear() + '-' + ('0' + (datumIstekaRezervacije.getMonth() + 1)).slice(-2) + '-' + ('0' + datumIstekaRezervacije.getDate()).slice(-2));
        this.rezervacijaForm3.controls['datumRodjenja'].setValue(datumRodjenja.getFullYear() + '-' + ('0' + (datumRodjenja.getMonth() + 1)).slice(-2) + '-' + ('0' + datumRodjenja.getDate()).slice(-2));
        this.rezervacijaForm3.controls['idKorisnik'].setValue(data.user.idKorisnika);
        this.rezervacijaForm3.controls['imePrezime'].setValue(data.user.imePrezime);
        this.rezervacijaForm3.controls['grad'].setValue(data.user.grad.nazivGrada);
        this.rezervacijaForm3.controls['fakultet'].setValue(data.user.fakultet.nazivFakulteta);
      },
      error => {
        if (error.status == 404) {
          this.prikaz = false;
          this.poruka = "Ne postoji rezervacija za navedeni id primerka."
          if(this.language == 'en') {this.poruka = "Reservation don't exist."}
        }
        if (error.status == 400) {
          this.prikaz = false;
          this.poruka = "Nevalidan unos!"
          if(this.language == 'en') {this.poruka = "Invalid input"}
        }
      });
  }
  zaduzi(postData: { idRezervacija: number}) {
    this.zaduzenjeService.save(postData.idRezervacija).subscribe();
  }
}
