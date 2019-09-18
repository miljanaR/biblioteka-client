import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimerakServiceService } from 'src/app/services/primerakService/primerak-service.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { PublikacijaServiceService } from 'src/app/services/publikacijaService/publikacija-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { RezervacijaService } from 'src/app/services/rezervacijaService/rezervacija.service';
import { AuthService } from 'src/app/services/authService/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ZaduzenjeService } from 'src/app/services/zaduzenjeService/zaduzenje.service';
import { LanguageService } from 'src/app/services/language.service';
@Component({
  selector: 'app-primerak',
  templateUrl: './primerak.component.html',
  styleUrls: ['./primerak.component.css']
})
export class PrimerakComponent implements OnInit {
  dataSource: any;
  isbn: string;
  empty = true;
  publikacija: Publikacija;
  displayedColumns: string[] = ['id', 'datumStampe', 'zaIzdavanje', 'rezervisi'];
  poruka: string;
  prikaz = false;
  idKorisnik: number;
  isAdmin: boolean;
  language: string;
  clicked = false;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  publikacijeForm = new FormGroup({
    isbn: new FormControl(''),
    autor: new FormControl(''),
    jezik: new FormControl(''),
    nazivPublikacije: new FormControl(''),
    godinaIzdanja: new FormControl(''),
  });
  constructor(private router: ActivatedRoute, private _router: Router, private primerakService: PrimerakServiceService,
    private publikacijaService: PublikacijaServiceService, private rezervacijaService: RezervacijaService, private authService: AuthService,
    private zaduzenjeService: ZaduzenjeService, private langService: LanguageService) { }

  ngOnInit() {
    this.language= this.langService.getLanguage();
    this.isbn = this.router.snapshot.paramMap.get('isbn');
    this.populateTable();
    this.authService.isAdmin.subscribe(data => { this.isAdmin = data; });
    if (this.isAdmin) {
      this.displayedColumns = ['id', 'datumStampe', 'zaIzdavanje', 'info'];
    }

  }

  getRecord(id: number) {
    this.clicked = true;
    this.idKorisnik = Number(this.authService.currentUserValue.idKorisnika);
    this.rezervacijaService.save(id, this.idKorisnik).subscribe(
      data => { this._router.navigate(["/profil"]);
       });
    
  }
  populateTable() {
    this.primerakService.getAll(this.isbn).subscribe(responseData => {
      this.prikaz = true;
      this.dataSource = new MatTableDataSource(responseData);
      this.dataSource.paginator = this.paginator;
      this.publikacijaService.get(this.isbn).subscribe(data => {
        this.publikacija = data;
        this.publikacijeForm.controls['isbn'].setValue(data.isbn);
        this.publikacijeForm.controls['autor'].setValue(data.autor);
        this.publikacijeForm.controls['jezik'].setValue(data.jezik.nazivJezika);
        this.publikacijeForm.controls['nazivPublikacije'].setValue(data.nazivPublikacije);
        this.publikacijeForm.controls['godinaIzdanja'].setValue(data.godinaIzdanja);
      });
      if (responseData.length == 0) {
        this.empty = true;
      } else {
        this.empty = false;
      }
    }, error => {
      if (error.status == 404) {
        this.poruka = "Primerci za publikaciju sa navedenim isbn-om ne postoje!";
        if(this.language == 'en') {this.poruka = "Copies don't exist!"}
      }
    });
  }

  checkInfo(idPrimerak: number) {
    this.zaduzenjeService.get(idPrimerak).subscribe(
      data => {
        console.log("zad" + data);
        this._router.navigate(["/razduziPrimerak"], { state: { id: idPrimerak } });

      },
      error => {
        if (error.status == 404) {
          this.rezervacijaService.get(idPrimerak).subscribe(
            data => {
              console.log("rezerv" + data.idRezervacija + data.user);
              this._router.navigate(["/zaduziPrimerak"], { state: { id: idPrimerak } });
            })
        };
      });
  }
}
