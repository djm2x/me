import { SuperService } from './super.service';
import { Injectable } from '@angular/core';
import { Project } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends SuperService<Project> {

  constructor() {
    super('projects');
  }

  getAll(startIndex, pageSize, sortBy, sortDir, title, tech, url, git, ) {

    return this.http.get(`${this.urlApi}/${this.controller}/getAll/${startIndex}/${pageSize}/${sortBy}/${sortDir}/${title}/${tech}/${url}/${git}`);
  }

}
