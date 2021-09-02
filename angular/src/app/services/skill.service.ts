import { Skill } from 'src/app/models/models';
import { SuperService } from './super.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SkillService extends SuperService<Skill> {

  constructor() {
    super('skills');
  }

  getAll(startIndex, pageSize, sortBy, sortDir, domaine, ) {

    return this.http.get(`${this.urlApi}/${this.controller}/getAll/${startIndex}/${pageSize}/${sortBy}/${sortDir}/${domaine}`);
  }

}
