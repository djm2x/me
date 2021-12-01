import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './../api.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
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
  opt = new IEntity();

  selectServices: { [key: string]: Observable<any[]> } = {};

  constructor(private fb: FormBuilder, public service: ApiService<any>, private router: Router
    // tslint:disable-next-line:align
    , private http: HttpClient, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.o = this.instance;
    this.initContext();
    this.createForm();


    this.route.params.subscribe(async (params) => {
      // console.log(this.route.snapshot.data);
      if (+params.id !== 0) {
        this.o = await firstValueFrom(this.service.getOne(+params.id).pipe(delay(3000)));
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

      if (e.formField === 'date') {
        // this.myForm.addControl(e.key, new FormControl(formatDate(this.o[e.key], 'yyyy-MM-ddTHH:mm', 'fr')));
        this.myForm.addControl(e.key, new FormControl(this.o[e.key]));
      } else if (e.formField === 'selectFromLocal') {
        // const value = e.selectId.split('.').reduce((p, c) => this[p][c]);

        // exemble of value : e.selectId = session.organization.super_entity.id: 84 => value = 84
        let value = this;
        e.selectId.split('.').forEach(i =>  value = value[i]);

        this.myForm.addControl(e.key, new FormControl(value));
      } else if (e.relation) {
        const y = this.service.getFromDecorator(e.relation);

        //
        e.columns.push(...y.tableModel.columns);

        const fg = this.fb.group({});

        y.tableModel.columns.map(c => {

          fg.addControl(c.key, new FormControl(e.relation[c.key]));

          if (c.required) {
            fg.get(c.key).setValidators(Validators.required);
          }
        });

        this.myForm.addControl(e.key, fg);

        console.log(this.myForm.get(e.key))

        return;
      } else {
        this.myForm.addControl(e.key, new FormControl(this.o[e.key]));
      }

      // add simple validation if needed
      if (e.required) {
        this.myForm.get(e.key).setValidators(Validators.required);
      }

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

