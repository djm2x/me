import { SuperService } from './super.service';
import { Injectable } from '@angular/core';
import { Info } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class InfoService extends SuperService<Info> {

  constructor() {
    super('infos');
  }

  getAll(startIndex, pageSize, sortBy, sortDir, icon, text, name, href, ) {

    return this.http.get(`${this.urlApi}/${this.controller}/getAll/${startIndex}/${pageSize}/${sortBy}/${sortDir}/${icon}/${text}/${name}/${href}`);
  }

}
