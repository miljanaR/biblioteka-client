import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { AppRoutingModule, routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatNativeDateModule, MatIconModule } from '@angular/material';
import { AzurirajClanaComponent } from './clan/azuriraj-clana/azuriraj-clana.component';
import { RouterModule, Routes } from '@angular/router';
import { PronadjiPublikacijuComponent } from './publikacija/pronadji-publikaciju/pronadji-publikaciju.component';
import { PrimerakComponent } from './primerak/primerak/primerak.component';
import { PrikazPotpunogClanaComponent } from './clan/prikaz/prikaz-potpunog-clana/prikaz-potpunog-clana.component';
import { ClanPocetnaComponent } from './clan/pocetna/clan-pocetna/clan-pocetna.component';
import { ZaduziPrimerakComponent } from './primerak/zaduzi-primerak/zaduzi-primerak.component';
import { RazduziPrimerakComponent } from './primerak/razduzi-primerak/razduzi-primerak.component';
import { HttpModule } from '@angular/http';
import { BasicAuthInterceptor } from './interceptor/authentication.interceptor';
import { ClanService } from './services/clanService/clan.service';
import { KreirajClanaComponent } from './clan/kreiraj-clana/kreiraj-clana.component';
import { IstorijaComponent } from './istorija/istorija.component';
import { LogInComponent } from 'src/app/log-in/log-in.component';
import { PocetnaAdminComponent } from './admin/pocetna-admin/pocetna-admin.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';



registerLocaleData(localeFr, 'sr');

@NgModule({
  declarations: [
   AppComponent,
   routingComponents,
   LogInComponent,
   AzurirajClanaComponent,
   PronadjiPublikacijuComponent,
   PrimerakComponent,
   PrikazPotpunogClanaComponent,
   ClanPocetnaComponent,
   ZaduziPrimerakComponent,
   RazduziPrimerakComponent,
   KreirajClanaComponent,
   IstorijaComponent,
   PocetnaAdminComponent,
   ToolbarComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatNativeDateModule,
    RouterModule,
    AppRoutingModule,
    MatIconModule,
    HttpModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatGridListModule,
    MatMenuModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true }, ClanService],
  bootstrap: [AppComponent]
})
export class AppModule { }

