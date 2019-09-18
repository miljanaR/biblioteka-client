import { Component, OnInit, ViewChild } from '@angular/core';
import { RezervacijaService } from 'src/app/services/rezervacijaService/rezervacija.service';
import { ZaduzenjeService } from 'src/app/services/zaduzenjeService/zaduzenje.service';
import { Zaduzenje } from 'src/app/model/Zaduzenje';
import { Rezervacija } from 'src/app/model/Rezervacija';
import { Router } from '@angular/router';
import { ObavestenjeService } from 'src/app/services/obavestenje.service';
import { Obavestenje} from 'src/app/model/Obavestenje';
import { User} from 'src/app/model/User';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-pocetna-admin',
  templateUrl: './pocetna-admin.component.html',
  styleUrls: ['./pocetna-admin.component.css']
})
export class PocetnaAdminComponent implements OnInit {
  rezervacije: Array<Rezervacija>;
  zaduzenja: Array<Zaduzenje>;
  obavestenja: Array<Obavestenje>;
  admin: User;
  vremePristupa: Date;
  porukaRezervacije: string;
  postojeRezervacije: boolean = false;
  porukaZaduzenja: string;
  postojeZaduzenjae: boolean = false;

  constructor(private rezervacijaService: RezervacijaService, private zaduzenjeService: ZaduzenjeService,
     private _router : Router, private obavestenjaSerice: ObavestenjeService, private authService: AuthService) { }

  ngOnInit() {
   this.admin= this.authService.currentUserValue;
    this.vremePristupa = this.authService.getVremePristupa();
    
    this.rezervacijaService.getReservationsForToday().subscribe(
      data => {
        if(data.length > 0){
          this.rezervacije = data;
           this.postojeRezervacije = true;
        }else{
          this.porukaRezervacije = "Za danas ne postoje rezervacije :D";
          this.postojeRezervacije = false;
        }
      });

      this.zaduzenjeService.getForToday().subscribe(
        data => {
          if(data.length > 0){
          this.zaduzenja = data;
          this.postojeZaduzenjae = true;
          }else {
            this.porukaZaduzenja = "Za danas ne postoje zaduzenja :D";
            this.postojeZaduzenjae = false;
          }
        });
    this.obavestenjaSerice.getAll().subscribe(
      data => {
        this.obavestenja = data;
        
      }
    )

  }

  details(idPrimerak: number){
    this.rezervacijaService.get(idPrimerak).subscribe(
      data => {
        this._router.navigate(["/zaduziPrimerak"], { state: { id: idPrimerak } });

      });
  }

  info(idPrimerak: number){
    this.zaduzenjeService.get(idPrimerak).subscribe(
      data => {
        this._router.navigate(["/razduziPrimerak"], { state: { id: idPrimerak } });

      });
  }
  getClanInfo(idKorisnika: number){
    this._router.navigate(['/prikazClana', idKorisnika]);
  }
}
