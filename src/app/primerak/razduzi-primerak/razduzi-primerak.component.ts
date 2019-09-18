import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RezervacijaService } from 'src/app/services/rezervacijaService/rezervacija.service';
import { ZaduzenjeService } from 'src/app/services/zaduzenjeService/zaduzenje.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-razduzi-primerak',
  templateUrl: './razduzi-primerak.component.html',
  styleUrls: ['./razduzi-primerak.component.css']
})
export class RazduziPrimerakComponent implements OnInit {
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
    idZaduzenje: new FormControl(''),
    datumZaduzenja: new FormControl(''),
    rokZaPovratak: new FormControl(''),
  });
  rezervacijaForm3 = new FormGroup({
    idKorisnik: new FormControl(''),
    imePrezime: new FormControl(''),
    datumRodjenja: new FormControl(''),
    elektronskaPosta: new FormControl(''),
    grad: new FormControl(''),
    fakultet: new FormControl(''),
  });
  prikaz = false;
  poruka: string;
  state: number;
  onlyForView: boolean = false;
  language: string;

  constructor(private rezervacijaService: RezervacijaService, private zaduzenjeService: ZaduzenjeService,
     public activatedRoute: ActivatedRoute, private langService: LanguageService) { }

  ngOnInit() {
    this.language= this.langService.getLanguage();
    this.activatedRoute.paramMap
      .pipe(map(() => window.history.state.id)).subscribe(data => { this.state = data; });
    if (this.state != null) {
      this.onSubmit(this.state);
      this.onlyForView = true;
    }
  }

  onSubmit(id: number) {
    this.zaduzenjeService.get(id).subscribe(
      data => {
        this.prikaz = true;
        this.poruka = "";
        let datumStampe = new Date(data.rezervacija.primerak.datumStampe);
        let datumZaduzenja = new Date(data.datumZaduzenja);
        let rokZaPovratak = new Date(data.rokZaPovratak);
        let datumRodjenja = new Date(data.rezervacija.user.datumRodjenja);
        this.rezervacijaForm.controls['isbn'].setValue(data.rezervacija.primerak.publikacija.isbn);
        this.rezervacijaForm.controls['autor'].setValue(data.rezervacija.primerak.publikacija.autor);
        this.rezervacijaForm.controls['jezik'].setValue(data.rezervacija.primerak.publikacija.jezik.nazivJezika);
        this.rezervacijaForm.controls['nazivPublikacije'].setValue(data.rezervacija.primerak.publikacija.nazivPublikacije);
        this.rezervacijaForm.controls['godinaIzdanja'].setValue(data.rezervacija.primerak.publikacija.godinaIzdanja);
        this.rezervacijaForm.controls['datumStampe'].setValue(datumStampe.getFullYear() + '-' + ('0' + (datumStampe.getMonth() + 1)).slice(-2) + '-' + ('0' + datumStampe.getDate()).slice(-2));
        this.rezervacijaForm2.controls['idZaduzenje'].setValue(data.idZaduzenje);
        this.rezervacijaForm2.controls['datumZaduzenja'].setValue(datumZaduzenja.getFullYear() + '-' + ('0' + (datumZaduzenja.getMonth() + 1)).slice(-2) + '-' + ('0' + datumZaduzenja.getDate()).slice(-2));
        this.rezervacijaForm2.controls['rokZaPovratak'].setValue(rokZaPovratak.getFullYear() + '-' + ('0' + (rokZaPovratak.getMonth() + 1)).slice(-2) + '-' + ('0' + rokZaPovratak.getDate()).slice(-2));
        this.rezervacijaForm3.controls['datumRodjenja'].setValue(datumRodjenja.getFullYear() + '-' + ('0' + (datumRodjenja.getMonth() + 1)).slice(-2) + '-' + ('0' + datumRodjenja.getDate()).slice(-2));
        this.rezervacijaForm3.controls['idKorisnik'].setValue(data.rezervacija.user.idKorisnika);
        this.rezervacijaForm3.controls['imePrezime'].setValue(data.rezervacija.user.imePrezime);
        this.rezervacijaForm3.controls['grad'].setValue(data.rezervacija.user.grad.nazivGrada);
        this.rezervacijaForm3.controls['fakultet'].setValue(data.rezervacija.user.fakultet.nazivFakulteta);
      },
      error => {
        if (error.status == 404) {
          this.prikaz = false;
          this.poruka = "Ne postoji zaduzenje za navedeni id primerka."
           if(this.language == 'en') {this.poruka = "Loan don't exist."}
        }
        if (error.status == 400) {
          this.prikaz = false;
          this.poruka = "Nevalidan unos!"
          if(this.language == 'en') {this.poruka = "Invalid input."}
        }
      });
  }
  onSubmit2(postData: { idZaduzenje: number }) {
    this.zaduzenjeService.returnBook(postData.idZaduzenje).subscribe();
  }
}
