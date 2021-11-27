import { HttpClient } from '@angular/common/http';
import { ApiService } from './../api.service';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import {  FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { IEntity } from '../decorators/column';
import { ColumnModel } from '../decorators/column.model';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];

  myForm = this.fb.group({});
  o: any;
  title = '';

  columns: ColumnModel[];
  opt = new IEntity();

  selectServices: { [key: string]: Observable<any[]>} = {};

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) private data: any
    ,         private fb: FormBuilder, public service: ApiService<any>, private http: HttpClient) { }

  async ngOnInit() {

    this.o = this.data.model;
    this.title = this.data.title;

    this.initContext();

    this.createForm();
  }

  initContext(e: { opt: any, tableModel: any } = this.service.getFromDecorator(this.o)) {
    // get from decorator ts
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
    this.dialogRef.close();
  }

  onOkClick(o: any): void {
    console.log(o);
    // return;
    let sub = null;
    if (!o.id || o.id === 0) {
      sub = this.service.set(this.opt.serviceName).post(o).subscribe(r => {
        this.dialogRef.close(o);
      });
    } else {
      sub = this.service.set(this.opt.serviceName).put(o.id, o).subscribe(r => {
        this.dialogRef.close(o);
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

        console.log(e.required)
      }
    });


    // this.columns.forEach(e => {
    //   console.log(this.myForm.controls[e.key])

    // })

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
