import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public private = '';
  public filter = '';
  constructor() { }
}
