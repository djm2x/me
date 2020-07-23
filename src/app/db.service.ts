import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http: HttpClient) { }

  projects() {
    return this.all().pipe(map(e => e.projects.sort((a, b) => b.id - a.id)));
  }

  skills() {
    return this.all().pipe(map(e => e.skills.sort((a, b) => a.id - b.id)));
  }

  educations() {
    return this.all().pipe(map(e => e.educations.sort((a, b) => b.id - a.id)));
  }

  all() {
    return this.http.get<DataBase>('assets/db/database.json');
  }
}

export class DataBase {
  projects: Project[] = [];
  skills: Skill[];
  educations: Education[];
}

export class Project {
  id = 0;
  title = '';
  date = new Date();
  description = '';
  tech = '';
  image = '';
  url = '';
  git = '';
}

export class Skill {
  id = 0;
  domaine = '';
  items: {name: string, value: number}[] = [];
}

export class Education {
  id = 0;
  period = '';
  dipolma = '';
  universite = '';
}
