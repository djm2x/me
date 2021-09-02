import { UowService } from 'src/app/services/uow.service';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from 'src/app/models/models';
import { Subject, Subscription } from 'rxjs';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];

  myForm: FormGroup;
  o: Project;
  title = '';
  

  folderToSaveInServer = 'projects';

  imageTo = new Subject();
imageFrom = new Subject();



  eventSubmitFromParent = new Subject();

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any
    , private fb: FormBuilder, private uow: UowService) { }

  async ngOnInit() {
    this.o = this.data.model;
    this.title = this.data.title;
    this.createForm();
   
    this.imageFrom.subscribe(r => this.myForm.get('image').setValue(r));


    setTimeout(() => {
       setTimeout(() => { this.imageTo.next(this.o.image);;
  }, 100);
    }, 100);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(o: Project): void {
    let sub = null;
    if (o.id === 0) {
      sub = this.uow.projects.post(o).subscribe(r => {
        this.eventSubmitFromParent.next(true);
        this.dialogRef.close(o);
      });
    } else {
      sub = this.uow.projects.put(o.id, o).subscribe(r => {
        this.eventSubmitFromParent.next(true);
        this.dialogRef.close(o);
      });
    }

    this.subs.push(sub);
  }

  createForm() {
    this.myForm = this.fb.group({
      id: [this.o.id, [Validators.required, ]],
title: [this.o.title, [Validators.required, ]],
date: [this.o.date, [Validators.required, ]],
description: [this.o.description, [Validators.required, ]],
tech: [this.o.tech, [Validators.required, ]],
image: [this.o.image, [Validators.required, ]],
url: [this.o.url, [Validators.required, ]],
isPrivate: [this.o.isPrivate, [Validators.required, ]],
git: [this.o.git, [Validators.required, ]],

    });
  }

  resetForm() {
    this.o = new Project();
    this.createForm();
  }

  ngOnDestroy(): void {
    this.subs.forEach(e => {
      e.unsubscribe();
    });
  }

}
