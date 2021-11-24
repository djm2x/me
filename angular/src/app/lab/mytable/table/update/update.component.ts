import { ApiService } from './../api.service';
import { UowService } from 'src/app/services/uow.service';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, Subscription } from 'rxjs';
import { ColumnModel } from '../../decorators/column.model';
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

  eventSubmitFromParent = new Subject();

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any
            , private fb: FormBuilder, private uow: UowService, private service: ApiService<any>) { }

  async ngOnInit() {

    this.o = this.data.model;
    this.title = this.data.title;

    this.init();

    this.createForm();
  }

  init(e: { opt: any, tableModel: any } = this.service.getFromDecorator(this.o)) {
    // get from decorator ts
    const opt = e.opt;
    const tableModel = e.tableModel;

    this.service.controller = opt.serviceName;

    this.columns = tableModel.columns;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(o: any): void {
    let sub = null;
    if (o.id === 0) {
      sub = this.service.post(o).subscribe(r => {
        this.dialogRef.close(o);
      });
    } else {
      sub = this.service.put(o.id, o).subscribe(r => {
        this.dialogRef.close(o);
      });
    }

    this.subs.push(sub);
  }

  createForm() {
    this.myForm = this.fb.group({});

    this.columns.map(e => {
      this.myForm.addControl(e.key , new FormControl(this.o[e.key], Validators.required));
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
  }

}
