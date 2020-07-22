import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http: HttpClient) { }

  projects() {
    return this.http.get<DataBase>('assets/db/database.json').pipe(map(e => e.projects.sort((a, b) => b.id - a.id)));
  }
}

export class DataBase {
  projects: Project[] = [];

  skills: any[];
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
