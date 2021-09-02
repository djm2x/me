import { SuperService } from './super.service';
import { Injectable } from '@angular/core';
import { Language } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class LanguageService extends SuperService<Language> {

  constructor() {
    super('languages');
  }

  getAll(startIndex, pageSize, sortBy, sortDir, lang, level, ) {

    return this.http.get(`${this.urlApi}/${this.controller}/getAll/${startIndex}/${pageSize}/${sortBy}/${sortDir}/${lang}/${level}`);
  }

}
