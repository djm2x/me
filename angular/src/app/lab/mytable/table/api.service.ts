import { TableModel } from './../decorators/table.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IEntity, tableSymbol } from '../decorators/column';


@Injectable({
  providedIn: 'root'
})
export class ApiService<T> {

  apiUrl = environment.apiUrl;
  controller = '';

  constructor(public http: HttpClient) { }

  /**
   * set controller name
   */
  set(controller: string) {
    this.controller = controller;

    return this;
  }

  // utils
  getFromDecorator(instance: any): {opt: IEntity, tableModel: TableModel} {
    return {
      opt: instance.opt,
      tableModel: instance[tableSymbol],
    } ;
  }

  getPage(startIndex, pageSize, sortBy, sortDir, ...arg) {
    return this.http.get<{ list: T[], count: number }>
      (`${this.apiUrl}/${this.controller}/getAll/${startIndex}/${pageSize}/${sortBy}/${sortDir}/${arg}`);
  }

  get = () => this.http.get<T[]>(`${this.apiUrl}/${this.controller}/get`);

  count = () => this.http.get<number>(`${this.apiUrl}/${this.controller}/count`);

  getOne = (id) => this.http.get<T>(`${this.apiUrl}/${this.controller}/get/${id}`);

  post = (o: T) => this.http.post<T>(`${this.apiUrl}/${this.controller}/post`, o);

  put = (id: number | string, o: T) => this.http.put<any>(`${this.apiUrl}/${this.controller}/put/${id}`, o);

  /**
   * Exemple
   * const model = [ { op: "replace", path: "/email", value: obj.email }];
   */
  patch(id: number, model: { op: string, path: string, value: any }[]) {
    return this.http.patch<T>(`${this.apiUrl}/${this.controller}/patch/${id}`, model);
  }

  delete = (id) => this.http.delete<any>(`${this.apiUrl}/${this.controller}/delete/${id}`);

  updateRange(o: T[]) {
    return this.http.post(`${this.apiUrl}/${this.controller}/updateRange`, o);
  }

  deleteRange(o: T[]) {
    return this.http.post(`${this.apiUrl}/${this.controller}/deleteRange`, o);
  }

  deleteRangeByIds(ids: number[]) {
    return this.http.post(`${this.apiUrl}/${this.controller}/deleteRangeByIds`, ids);
  }

  postRange(o: T[]) {
    return this.http.post(`${this.apiUrl}/${this.controller}/postRange`, o);
  }

  autocomplete(column: string, name: string) {
    return this.http.get(`${this.apiUrl}/${this.controller}/autocomplete/${column}/${name}`);
  }

  getByForeignkey(id) {
    return this.http.get<T[]>(`${this.apiUrl}/${this.controller}/getByForeignkey/${id}`);
  }
}
