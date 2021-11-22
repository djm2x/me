import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Car } from './resources';

@Component({
  selector: 'app-mytable',
  templateUrl: './mytable.component.html',
  styleUrls: ['./mytable.component.scss']
})
export class MytableComponent implements OnInit {
  list = new Subject<any[]>();
  constructor(private http: HttpClient) { }

  ngOnInit() {
    // this.get().subscribe();

  }

  get() {
    return this.http.get<Car[]>('/assets/json/car.json').pipe(map(r => {

      this.list.next(r.map(e => Object.assign(new Car(), e)));

      return r.map(e => Object.assign(new Car(), e));
    } ));
  }

  emit() {
    this.get().subscribe();
  }
}
