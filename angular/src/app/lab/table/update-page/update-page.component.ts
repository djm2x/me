import { HttpClient } from '@angular/common/http';
import { ApiService } from './../api.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import {  Observable, Subscription, Subject, firstValueFrom } from 'rxjs';
import { ColumnModel } from '../decorators/column.model';
import { IEntity } from '../decorators/entity.decorator';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-update-page',
  templateUrl: './update-page.component.html',
  styleUrls: ['./update-page.component.scss']
})
export class UpdatePageComponent implements OnInit, OnDestroy {
  @Input() instance: any;
  subs: Subscription[] = [];

  myForm = this.fb.group({});
  o: any;
  title = '';

  columns: ColumnModel[];
  columns$ = new Subject();
  opt = new IEntity();

  selectServices: { [key: string]: Observable<any[]> } = {};

  constructor(private fb: FormBuilder, public service: ApiService<any>, private router: Router
    // tslint:disable-next-line:align
    , private http: HttpClient, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.columns$.subscribe(r => {
      console.log(r)
    })
    this.o = this.instance;
    this.initContext();
    this.createForm();


    this.route.params.subscribe(async (params) => {
      // console.log(this.route.snapshot.data);
      if (+params.id !== 0) {
        this.o = await firstValueFrom(this.service.getOne(+params.id));
        this.updateForm();
      }
    });


  }

  initContext(e: { opt: any, tableModel: any } = this.service.getFromDecorator(this.instance)) {
    // get from decorator ts
    // console.log(e);
    this.opt = e.opt;

    this.service.controller = this.opt.serviceName;

    this.columns = e.tableModel.columns;

    setTimeout(() => {
      this.columns$.next(this.columns);
    }, 20);


    this.columns.map(c => {
      if (c.formField === 'select') {
        this.selectServices[c.serviceName] = new ApiService(this.http).set(c.serviceName).get();
      }
    });

  }

  onNoClick(): void {
    this.router.navigate([this.router.url.substring(0, this.router.url.indexOf('/update'))]);
  }

  onOkClick(o: any): void {
    let sub = null;
    if (!o.id || o.id === 0) {
      sub = this.service.set(this.opt.serviceName).post(o).subscribe(r => {
        this.router.navigate([this.router.url.replace(this.route.snapshot.paramMap.get('id'), r.id)]);
      });
    } else {
      sub = this.service.set(this.opt.serviceName).put(o.id, o).subscribe(r => {

      });
    }

    this.subs.push(sub);
  }

  ff(e) {
    alert(e);
  }

  createForm() {
    this.columns.map(e => {

      this.myForm.addControl(e.key, new FormControl(this.o[e.key]));

      // add simple validation if needed
      if (e.required) {
        this.myForm.get(e.key).setValidators(Validators.required);
      }

    });


  }

  updateForm() {
    this.columns.map(e => {
      this.myForm.get(e.key).setValue(this.o[e.key]);
    });

    this.columns$.next(this.columns);
  }

  // resetForm() {
  //   this.o = new User();
  //   this.createForm();
  // }

  ngOnDestroy(): void {
    this.subs.forEach(e => {
      e.unsubscribe();
    });

    this.selectServices = null;
  }

}

