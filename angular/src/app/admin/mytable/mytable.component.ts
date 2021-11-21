import { Person } from './test';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Car } from './resources';
import { DeserializeArray } from 'cerialize';
import { JsonArray } from 'cerialize/dist/util';

@Component({
  selector: 'app-mytable',
  templateUrl: './mytable.component.html',
  styleUrls: ['./mytable.component.scss']
})
export class MytableComponent implements OnInit {
  cars$: Observable<Car[]>;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cars$ = this.http.get('/assets/json/car.json').pipe(
      map((res: JsonArray) => {
        const f = DeserializeArray(res, Car);

        // console.log(f);
        return  f;
      }),
      // map((r: Car) => {
      //   console.log(r);

      //   return r;
      // }),
      // tap(res => console.log(res))
    ) as any;

  }
}
