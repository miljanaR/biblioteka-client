import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PublikacijaServiceService } from 'src/app/services/publikacijaService/publikacija-service.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-pronadji-publikaciju',
  templateUrl: './pronadji-publikaciju.component.html',
  styleUrls: ['./pronadji-publikaciju.component.css']
})
export class PronadjiPublikacijuComponent implements OnInit {
  dataSource: any;
  submited = false;
  poruka: string;
  language: string;
  displayedColumns: string[] = ['isbn', 'nazivPublikacije', 'jezik', 'autor', 'godinaIzdanja', 'akcija'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit() {
    this.language= this.langService.getLanguage();
  }
  constructor(private publikacijaService: PublikacijaServiceService, 
    private langService: LanguageService, private _router: Router) { }
  publikacijeForm = new FormGroup({
    isbn: new FormControl(''),
    nazivPublikacije: new FormControl(''),
    autor: new FormControl('')
  });

  onSubmit(postData: { isbn: string, nazivPublikacije: string, autor: String }) {
    if (postData.isbn === "" && postData.autor === "" && postData.nazivPublikacije === "") {
      this.submited = false;
      this.poruka = "Unesite bar jedan parametar za pretragu."
      if(this.language == 'en') {this.poruka = "Enter parameter for search."}
    } else {
      this.publikacijaService.getAll(postData.autor, postData.isbn, postData.nazivPublikacije)
        .subscribe(responseData => {
          if (responseData.length == 0) {
            this.submited = false;
            this.poruka = " Ne postoji publikacija sa zadatim uslovima pretrage."
            if(this.language == 'en') {this.poruka = "There are no publications."}
          } else {
            this.dataSource = new MatTableDataSource(responseData);
            this.dataSource.paginator = this.paginator;
            this.submited = true;
            this.poruka = "";
          }
        });
    }
  }
  getRecord(isbn: String) {
    this._router.navigate(['/primerci', isbn]);
  }
}
