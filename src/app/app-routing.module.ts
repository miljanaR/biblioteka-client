import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClanListComponent } from './clan/clan-list/clan-list.component';
import { AzurirajClanaComponent } from './clan/azuriraj-clana/azuriraj-clana.component';
import { PronadjiPublikacijuComponent } from './publikacija/pronadji-publikaciju/pronadji-publikaciju.component';
import { PrimerakComponent } from './primerak/primerak/primerak.component';
import { PrikazPotpunogClanaComponent } from './clan/prikaz/prikaz-potpunog-clana/prikaz-potpunog-clana.component';
import { ClanPocetnaComponent } from './clan/pocetna/clan-pocetna/clan-pocetna.component';
import { ZaduziPrimerakComponent } from './primerak/zaduzi-primerak/zaduzi-primerak.component';
import { RazduziPrimerakComponent } from './primerak/razduzi-primerak/razduzi-primerak.component';
import { UrlPermission } from './urlPermissions/url.permission';
import { KreirajClanaComponent } from './clan/kreiraj-clana/kreiraj-clana.component';
import { IstorijaComponent } from './istorija/istorija.component';
import { AdminPermissions } from './urlPermissions/admin.permissions';
import { LogInComponent } from './log-in/log-in.component';
import { PocetnaAdminComponent } from './admin/pocetna-admin/pocetna-admin.component';



const routes: Routes = [
  { path: '', component: LogInComponent },
  { path: 'clanovi', component: ClanListComponent, canActivate: [AdminPermissions] },
  { path: 'pocetnaAdmin', component: PocetnaAdminComponent, canActivate: [AdminPermissions] },
  { path: 'kreirajClana', component: KreirajClanaComponent, canActivate: [AdminPermissions] },
  { path: 'izmenaClana/:id', component: AzurirajClanaComponent, canActivate: [AdminPermissions] },
  { path: 'prikazClana/:id', component: PrikazPotpunogClanaComponent, canActivate: [AdminPermissions] },
  { path: 'zaduziPrimerak', component: ZaduziPrimerakComponent, canActivate: [AdminPermissions] },
  { path: 'razduziPrimerak', component: RazduziPrimerakComponent, canActivate: [AdminPermissions] },
  { path: 'profil', component: ClanPocetnaComponent, canActivate: [UrlPermission] },
  { path: 'publikacije', component: PronadjiPublikacijuComponent, canActivate: [UrlPermission] },
  { path: 'primerci/:isbn', component: PrimerakComponent, canActivate: [UrlPermission] },
  { path: 'istorija', component: IstorijaComponent, canActivate: [UrlPermission] },
  { path: 'login', component: LogInComponent },
  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ClanListComponent, AzurirajClanaComponent]