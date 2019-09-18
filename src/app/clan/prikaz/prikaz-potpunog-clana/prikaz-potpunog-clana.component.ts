import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClanService } from 'src/app/services/clanService/clan.service';
import { RezervacijaService } from 'src/app/services/rezervacijaService/rezervacija.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ZaduzenjeService } from 'src/app/services/zaduzenjeService/zaduzenje.service';
import { LanguageService } from 'src/app/services/language.service';


@Component({
  selector: 'app-prikaz-potpunog-clana',
  templateUrl: './prikaz-potpunog-clana.component.html',
  styleUrls: ['./prikaz-potpunog-clana.component.css']
})
export class PrikazPotpunogClanaComponent implements OnInit {
  displayedColumns: string[] = ['idRezervacija', 'datumRezervisanja', 'datumIstekaRezervacije',
    'publikacija', 'isbn', 'autor', 'jezik', 'godinaIzdanja', 'primerak', 'datumStampe', 'akcija'];
  displayedColumnsZaduzenja: string[] = ['idZaduzenje', 'datumZaduzenja', 'rokZaPovratak', 'vracena',
    'rezervacija', 'isbn', 'naziv', 'autor', 'jezik', 'primerak', 'akcija'];
  dataSource: any;
  dataSourceZaduzenja: any;
  id: number;
  poruka: string;
  prikazi = true;
  rezervacijePostoje = false;
  zaduzenjaPostoje = false;
  porukaRezervacije : string;
  porukaZaduzenja : string;
  language : string;
  @ViewChild(MatPaginator, {static: true}) rezervacijePaginator: MatPaginator;
  @ViewChild('zaduzenjaPaginator', {static: true}) zaduzenjaPaginator: MatPaginator;
  viewClanForm = new FormGroup({
    idKorisnik: new FormControl(''),
    imePrezime: new FormControl(''),
    grad: new FormControl(''),
    datumRodjenja: new FormControl(''),
    username: new FormControl(''),
    fakultet: new FormControl(''),
    brojOtkaza: new FormControl('')
  });
  constructor(private router: ActivatedRoute, private clanService: ClanService, private rezervacijaServica: RezervacijaService,
    private zaduzenjeService: ZaduzenjeService, private langService: LanguageService) {
    this.id = parseInt(this.router.snapshot.paramMap.get('id'));
    
    this.language= this.langService.getLanguage();
    this.clanService.get(this.id).subscribe(
      data => {
        let datumRodjenja = new Date(data.body.datumRodjenja);
        this.viewClanForm.controls['idKorisnik'].setValue(data.body.idKorisnika);
        this.viewClanForm.controls['imePrezime'].setValue(data.body.imePrezime);
        this.viewClanForm.controls['username'].setValue(data.body.username);
        this.viewClanForm.controls['fakultet'].setValue(data.body.fakultet.nazivFakulteta);
        this.viewClanForm.controls['grad'].setValue(data.body.grad.nazivGrada);
        this.viewClanForm.controls['datumRodjenja'].setValue(datumRodjenja.getFullYear() + '-' + ('0' + (datumRodjenja.getMonth() + 1)).slice(-2) + '-' + ('0' + datumRodjenja.getDate()).slice(-2));
        this.viewClanForm.controls['brojOtkaza'].setValue(data.body.brOtkazanih);
      },
      error => {
        if (error.status == 404) {
          this.poruka = "Clan sa zadatim clanskim brojem ne postoji";
          if(this.language == 'en') {this.poruka = "User does not exist"}
          this.prikazi = false;
        }
      }
    );
  }

  ngOnInit() {
    this.populateTables();
  }

  submitRecord(idRezervacija: number) {
    this.zaduzenjeService.save(idRezervacija).subscribe(
      data => {
        this.populateTables();
      });
  }

  freeRecord(idZaduzenje: number) {
    this.zaduzenjeService.returnBook(idZaduzenje).subscribe(
      data => {
        this.populateTables();
      });
  }

  populateTables() {
    this.rezervacijaServica.getAll(this.id).subscribe(
      data => {
        if (data.length == 0) {
          this.rezervacijePostoje = false;
          this.porukaRezervacije = "Trenutno ne postoje rezervacije.";
          if(this.language == 'en') {this.porukaRezervacije = "There are no reservations."}
        } else {
          this.rezervacijePostoje = true;
          this.porukaRezervacije = "";
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.rezervacijePaginator;
        }
      });
    this.zaduzenjeService.getAll(this.id).subscribe(
      data => {
        if (data.length == 0) {
          this.zaduzenjaPostoje = false;
          this.porukaZaduzenja = "Trenutno ne postoje zaduzenja.";
          if(this.language == 'en') {this.porukaZaduzenja = "There are no loans."}
        } else {
          this.zaduzenjaPostoje = true;
          this.porukaZaduzenja = "";
          this.dataSourceZaduzenja = new MatTableDataSource(data);
          this.dataSourceZaduzenja.paginator = this.zaduzenjaPaginator;
        }
      });
  }

}
