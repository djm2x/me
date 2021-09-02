import { SuperService } from './super.service';
import { Injectable } from '@angular/core';
import { Education } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class EducationService extends SuperService<Education> {

  constructor() {
    super('educations');
  }

  getAll(startIndex, pageSize, sortBy, sortDir, period, dipolma, universite, ) {

    return this.http.get(`${this.urlApi}/${this.controller}/getAll/${startIndex}/${pageSize}/${sortBy}/${sortDir}/${period}/${dipolma}/${universite}`);
  }

}
