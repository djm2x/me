import { SuperService } from './super.service';
import { Injectable } from '@angular/core';
import { Experience } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService extends SuperService<Experience> {

  constructor() {
    super('experiences');
  }

  getAll(startIndex, pageSize, sortBy, sortDir, period, societe, job, task, tech, links, ) {

    return this.http.get(`${this.urlApi}/${this.controller}/getAll/${startIndex}/${pageSize}/${sortBy}/${sortDir}/${period}/${societe}/${job}/${task}/${tech}/${links}`);
  }

}
