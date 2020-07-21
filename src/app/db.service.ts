import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http: HttpClient) { }

  projects() {
    return this.http.get<IDataBase>('assets/db/database.json').pipe(map(e => e.projects.sort((a, b) => b.id - a.id)));
  }
}

export interface IDataBase {
  projects: {
    id: number,
    title: string,
    date: Date,
    description: string,
    tech: string,
    image: string,
    url: string,
    git: string,
  }[];

  skills: any[];
}
