import { Component, OnInit, ViewChild } from '@angular/core';
import { ClanService } from 'src/app/services/clanService/clan.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/User'
import { map } from 'rxjs/operators';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-clan-list',
  templateUrl: './clan-list.component.html',
  styleUrls: ['./clan-list.component.css']
})
export class ClanListComponent implements OnInit {
  displayedColumns: string[] = ['idKorisnika', 'imePrezime', 'datumRodjenja',
    'grad', 'fakultet', 'brOtkazanih', 'username', 'aktion', 'view', 'history'];

  dataSource: any;
  message: string;
  prikaz = true;
  language : string;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private clanService: ClanService, private _router: Router, private langService: LanguageService) { }

  ngOnInit() {

    this.populateTable();
    this.language= this.langService.getLanguage();
   
  }

  applyFilter(filterValue: string) {
    this.prikaz = true;
    if (filterValue == "") {
      this.populateTable();

    } else {
      this.dataSource.filter = filterValue.trim();
      this.dataSource.paginator = this.paginator;
      if (this.dataSource.filteredData.length == 0) {
        this.prikaz = false;
      }
    }
  }

  pretraga(idKorisnik: string) {
    if (idKorisnik == "") {
      this.populateTable();
    }
    else {
      this.clanService.get(Number(idKorisnik)).subscribe(
        data => {
          let dataArr: Array<User> = [data.body];
          this.dataSource = new MatTableDataSource(dataArr);
          this.dataSource.paginator = this.paginator;
          this.message = "";
          this.prikaz = true;
        },
        error => {
          if (error.status == 404) {
            this.message = "Sistem ne moze da prondaje clanove po zadatoj vrednosti."
            if(this.language == 'en'){this.message="User does not exist."}
            this.prikaz = false;
          }
          if (error.status == 400) {
            this.message = "Nevalidan unos."
            if(this.language == 'en'){this.message="Invalid input"}
            this.prikaz = false;
          }
        });
    }
  }

  editRecord(id: number) {
    this._router.navigate(['/izmenaClana', id]);
  }

  viewRecord(id: number) {
    this._router.navigate(['/prikazClana', id]);
  }

  populateTable() {
    this.clanService.getAll().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
  }

  getHistory(idKorisnik: number) {
    this._router.navigate(['/istorija'], { state: { id: idKorisnik } });
  }
}

