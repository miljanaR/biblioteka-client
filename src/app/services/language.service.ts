import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() { }
  getLanguage(){
    return localStorage.getItem('locale');
  }
}
