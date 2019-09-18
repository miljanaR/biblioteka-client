import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClanService } from 'src/app/services/clanService/clan.service';
import { RezervacijaService } from 'src/app/services/rezervacijaService/rezervacija.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ZaduzenjeService } from 'src/app/services/zaduzenjeService/zaduzenje.service';
import { AuthService } from '../services/authService/auth.service';
import { map } from 'rxjs/operators';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-istorija',
  templateUrl: './istorija.component.html',
  styleUrls: ['./istorija.component.css']
})
export class IstorijaComponent implements OnInit {
  displayedColumnsZaduzenja: string[] = ['idZaduzenje', 'datumZaduzenja', 'datumPovratka',
    'rezervacija', 'isbn', 'naziv', 'autor', 'jezik', 'primerak', 'akcija'];
  porukaZaduzenja : string;
  zaduzenjaPostoje = false;
  dataSourceZaduzenja : any;
  idKorisnik : number;
  language : string;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private _router: Router, private clanService: ClanService, private authService: AuthService,
    private zaduzenjeService: ZaduzenjeService, public activatedRoute: ActivatedRoute, private langService: LanguageService) {
  }

  ngOnInit() {
    this.language= this.langService.getLanguage();
    this.activatedRoute.paramMap
      .pipe(map(() => window.history.state.id)).subscribe(data => { this.idKorisnik = data; })
    if (this.idKorisnik == undefined) {
      this.idKorisnik = Number(this.authService.currentUserValue.idKorisnika);
    }
    this.populateTable(this.idKorisnik);
  }
  populateTable(idKorisnik: number) {
    this.zaduzenjeService.getHistory(this.idKorisnik).subscribe(
      data => {
        if (data.length == 0) {
          this.zaduzenjaPostoje = false;
          this.porukaZaduzenja = "Istorija zaduzenja ne postoji.";
          if(this.language == 'en') {this.porukaZaduzenja = "There are no history."}
        } else {
          this.zaduzenjaPostoje = true;
          this.porukaZaduzenja = "";
          this.dataSourceZaduzenja = new MatTableDataSource(data);
          this.dataSourceZaduzenja.paginator = this.paginator;
        }
      });
  }
  check(isbn: string) {
    this._router.navigate(['/primerci', isbn]);
  }
}
