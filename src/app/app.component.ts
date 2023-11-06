import { Component, OnInit, HostBinding, inject } from '@angular/core';
import { SplashScreenService } from './shared/splash-screen.service';
import { SharedService } from './shared/service.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { FormControl } from '@angular/forms';
import { DataService } from './data.service';
import { Observable, Subject, catchError, delay, map, of, startWith, switchMap, take, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';

import '../typings.d.ts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  readonly data = inject(DataService);

  readonly data$ = this.data.getAllData().pipe(
    tap(e => {
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>');
      console.log(e);
    }),
    delay(1000),
    // tap(e => this.update$.next({me: 'you'})),
  );

  readonly update$ = new Subject<any>();
  // readonly #update = toSignal( this.update$.pipe( 
  //   startWith({me: 'you'}),
  //   switchMap( e => this.data.createData(e).pipe(
  //     catchError(this.handleError),
  //   ) ),
  //   tap(e => console.warn(e)),
  // ));


  handleError = <T>(e: HttpErrorResponse, source: Observable<T>) => of({ code: -10, message: `${e.status} : ${e.message}` }).pipe(
    tap(_ => console.dir(e)),
    take(1),
    // tap(e => this.snack.open(e.message)),
    map(e => e as T & { code: number, message: string }),
    // switchMap(_ => source),
  );

  constructor(public service: SharedService) { }

  ngOnInit() { 
    console.warn(process.env.NODE_ENV);


  }
}
