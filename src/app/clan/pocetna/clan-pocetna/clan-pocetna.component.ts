import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClanService } from 'src/app/services/clanService/clan.service';
import { RezervacijaService } from 'src/app/services/rezervacijaService/rezervacija.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ZaduzenjeService } from 'src/app/services/zaduzenjeService/zaduzenje.service';
import { AuthService } from 'src/app/services/authService/auth.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-clan-pocetna',
  templateUrl: './clan-pocetna.component.html',
  styleUrls: ['./clan-pocetna.component.css']
})
export class ClanPocetnaComponent implements OnInit {
  displayedColumns: string[] = ['idRezervacija', 'datumRezervisanja', 'datumIstekaRezervacije',
    'publikacija', 'isbn', 'autor', 'jezik', 'godinaIzdanja', 'primerak', 'datumStampe'];
  displayedColumnsZaduzenja: string[] = ['idZaduzenje', 'datumZaduzenja', 'rokZaPovratak', 'vracena',
    'rezervacija', 'isbn', 'naziv', 'autor', 'jezik', 'primerak'];
  dataSource: any;
  dataSourceZaduzenja: any;
  id: number;
  rezervacijePostoje = false;
  zaduzenjaPostoje = false;
  porukaRezervacije: string;
  porukaZaduzenja: string;
  language: string;
  @ViewChild(MatPaginator, {static: true}) rezervacijePaginator: MatPaginator;
  @ViewChild('zaduzenjaPaginator', {static: true}) zaduzenjaPaginator: MatPaginator;
  constructor(private router: ActivatedRoute, private clanService: ClanService, private rezervacijaServica: RezervacijaService,
    private zaduzenjeService: ZaduzenjeService, private authService: AuthService, private langService: LanguageService) {
    this.id = Number(this.authService.currentUserValue.idKorisnika);
  }

  ngOnInit() {
    this.language= this.langService.getLanguage();
    this.populateTables();
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
