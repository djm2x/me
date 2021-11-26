import { ApiService } from './../api.service';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, Subscription } from 'rxjs';
import { ColumnModel } from '../../decorators/column.model';
import { IEntity as Entity } from '../../decorators/column';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];

  myForm: FormGroup;
  o: any;
  title = '';

  columns: ColumnModel[];
  opt = new Entity();

  eventSubmitFromParent = new Subject();

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any
            , private fb: FormBuilder, public service: ApiService<any>) { }

  async ngOnInit() {

    this.o = this.data.model;
    this.title = this.data.title;

    this.initContext();

    this.createForm();
  }

  initContext(e: { opt: any, tableModel: any } = this.service.getFromDecorator(this.o)) {
    // get from decorator ts
    this.opt = e.opt;
    const tableModel = e.tableModel;

    this.service.controller = this.opt.serviceName;

    this.columns = tableModel.columns;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(o: any): void {
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

  createForm() {
    this.myForm = this.fb.group({});

    this.columns.map(e => {
      this.myForm.addControl(e.key , new FormControl(this.o[e.key]));

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
  }

}
