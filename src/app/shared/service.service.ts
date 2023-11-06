import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  configs = {
    "showGitRepo": false
  };
  public private = '';
  public filter = '';
  constructor() { }
}
