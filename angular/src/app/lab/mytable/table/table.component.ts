import { UpdateComponent } from './update/update.component';
import { FormControl } from '@angular/forms';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IEntity as Entity, tableSymbol } from '../decorators/column';
import { ColumnModel } from './../decorators/column.model';
import { TableModel } from './../decorators/table.model';
import { MatSort, Sort, SortDirection } from '@angular/material/sort';
import { UowService } from 'src/app/services/uow.service';
import { SuperService } from 'src/app/services/super.service';
import { merge, Subject, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { startWith } from 'rxjs/operators';
import { ApiService } from './api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  private tableModel: TableModel;

  isLoadingResults = true;
  resultsLength = 0;
  isRateLimitReached = false;

  subs: Subscription[] = [];

  dataSource: any[] = [];

  opt = new Entity();

  @Input() instance: any;

  columns: ColumnModel[];
  displayedColumns: string[];

  update = new Subject<boolean>();
  panelOpenState = true;

  filters: { name: string, fc: FormControl }[] = [];

  constructor(private service: ApiService<any>, public dialog: MatDialog) { }

  ngOnInit() {
    this.init();

    const sub = merge(...[this.sort.sortChange, this.paginator.page, this.update]).pipe(startWith(null as any)).subscribe(
      r => {
        r === true ? this.paginator.pageIndex = 0 : r = r;
        !this.paginator.pageSize ? this.paginator.pageSize = 10 : r = r;
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.isLoadingResults = true;

        const args = this.filters.map(e => e.fc.value || '*').join('/');

        this.getPage(
          startIndex,
          this.paginator.pageSize,
          this.sort.active ? this.sort.active : 'id',
          this.sort.direction ? this.sort.direction : 'desc',
          args
          // this.username.value === '' ? '*' : this.username.value,
          // this.email.value === '' ? '*' : this.email.value,
          // this.role.value === '' ? '*' : this.role.value,
        );
      });
  }

  getPage(startIndex, pageSize, sortBy, sortDir, ...args) {
    // tslint:disable-next-line:max-line-length
    const sub = this.service.getPage(startIndex, pageSize, sortBy, sortDir, args).subscribe(
      (r: any) => {
        console.log(r);
        this.dataSource = r.list;
        this.resultsLength = r.count;
        this.isLoadingResults = false;
      }
    );

    this.subs.push(sub);
  }

  sortData(params: Sort) {
    // const direction: SortDirection = params.direction;
    // this.data = direction
    //   ? orderBy(this.data, [params.active], [direction])
    //   : this._originalData;

  }

  init(e: { opt: any, tableModel: any } = this.service.getFromDecorator(this.instance)) {
    // get from decorator ts
    this.opt = e.opt;
    this.tableModel = e.tableModel;

    this.service.controller = this.opt.serviceName;

    this.columns = this.tableModel.columns;

    this.filters = this.columns.filter(e => e.canFilter).map(e => {
      return {
        name: e.name,
        fc: new FormControl()
      };
    });

    // this.columns = sortBy(this.columns, ['order']);
    this.displayedColumns = this.columns.map(col => col.key);
    this.displayedColumns.push('option');
  }

  reset() {
    this.filters.forEach(e => {
      e.fc.reset();
    });

    this.update.next(true);
  }

  search() {
    this.update.next(true);
  }

  openDialog(o: any, text) {
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '1100px',
      disableClose: true,
      data: { model: Object.assign(this.instance, o), title: text }
    });

    return dialogRef.afterClosed();
  }

  add() {
    this.openDialog(this.instance, `Ajouter ${this.opt.name}`).subscribe(result => {
      if (result) {
        this.update.next(true);
      }
    });
  }

  edit(o: any) {
    this.openDialog(o, `Modifier ${this.opt.name}`).subscribe((result: any) => {
      if (result) {
        this.update.next(true);
      }
    });
  }

  async delete(id: number) {
    // const r = await this.mydialog.openDialog('User').toPromise();
    // if (r === 'ok') {
    //   const sub = this.uow.users.delete(id).subscribe(() => this.update.next(true));

    //   this.subs.push(sub);
    // }
  }
}
