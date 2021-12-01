import { Router, ActivatedRoute } from '@angular/router';
import { UpdateComponent } from './update/update.component';
import { FormControl } from '@angular/forms';
import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { MatSort, Sort, SortDirection } from '@angular/material/sort';
import { merge, Observable, Subject, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { startWith } from 'rxjs/operators';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { ColumnModel } from './decorators/column.model';
import { TableModel } from './decorators/table.model';
import { IEntity } from './decorators/entity.decorator';
import { Role } from 'src/app/models/models';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  private tableModel: TableModel;

  isLoadingResults = true;
  resultsLength = 0;
  isRateLimitReached = false;

  subs: Subscription[] = [];

  dataSource: any[] = [];
  selectedList: any[] = [];

  opt = new IEntity();

  @Input() instance: any;

  columns: ColumnModel[];
  displayedColumns: string[] = [];

  update = new Subject<boolean>();
  panelOpenState = true;

  filters: { formField: string, serviceName: string, name: string, fc: FormControl }[] = [];

  selectServices: { [key: string]: Observable<any[]> } = {};

  constructor(private service: ApiService<any>, public dialog: MatDialog
    ,         private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.init();

    const sub = merge(this.sort.sortChange, this.paginator.page, this.update).pipe(startWith(null as any)).subscribe(
      r => {
        r === true ? this.paginator.pageIndex = 0 : r = r;
        !this.paginator.pageSize ? this.paginator.pageSize = 10 : r = r;
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.isLoadingResults = true;

        const args = this.filters.map(e => e.fc.value || '*').join('/');

        console.log(args)

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
      (r) => {
        this.dataSource = r.list.map(e => {
          e.roles = new Role();
          return e;
        });
        this.resultsLength = r.count;
        this.isLoadingResults = false;
        console.log(this.dataSource);
      }
    );

    this.subs.push(sub);
  }

  sortData(params: Sort) {
    console.log(params)
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

    this.columns = this.tableModel.columns.filter(f => f.formField !== 'id' && f.tableDisplay === true).map(e => {
      if (e.relation) {
        const y = this.service.getFromDecorator(e.relation);

        e.columns.push(...y.tableModel.columns);

      }

      return e;
    });

    console.log(this.columns)

    this.filters = this.columns.filter(f => f.canFilter).map(f => {
      return {
        serviceName: f.serviceName,
        formField: f.formField,
        name: f.name,
        fc: new FormControl()
      };
    });

    this.filters.map(c => {
      if (c.formField === 'select') {
        this.selectServices[c.serviceName] = new ApiService(this.http).set(c.serviceName).get();
      }
    });

    // this.columns = sortBy(this.columns, ['order']);
    if (this.opt.deleteRange === true) {
      this.displayedColumns.push('select');
    }

    this.displayedColumns.push(...this.columns.map(col => col.key));
    this.displayedColumns.push('option');


  }

  getColumnValue(row: any, e : ColumnModel): string {
    const col = this.columns.find(c => c.key === e.key);

    console.log(e)

    let value = row[e.key];

    e.selectName.split('.').forEach(i =>  value = value[i]);

    return value;
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
    if (this.opt.popup === false) {
      this.router.navigate([this.opt.updateRoute, 0], { relativeTo: this.route });
      return;
    }

    this.openDialog(this.instance, `Ajouter ${this.opt.name}`).subscribe(result => {
      if (result) {
        this.update.next(true);
      }
    });
  }

  edit(o: any) {
    if (this.opt.popup === false) {
      this.router.navigate([this.opt.updateRoute, o.id], { relativeTo: this.route });
      return;
    }

    this.openDialog(o, `Modifier ${this.opt.name}`).subscribe((result: any) => {
      if (result) {
        this.update.next(true);
      }
    });
  }

  async delete(id: number) {
    const sub = this.service.delete(id).subscribe(() => this.update.next(true));

    this.subs.push(sub);
  }

  //
  isSelected(row: any): boolean {
    return this.selectedList.find(e => e.id === row.id) ? true : false;
  }

  check(row: any) {
    const i = this.selectedList.findIndex(o => row.id === o.id);
    const existe: boolean = i !== -1;

    existe ? this.selectedList.splice(i, 1) : this.selectedList.push(row);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    const numSelected = this.selectedList.length;
    const numRows = this.dataSource.length;

    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ? this.selectedList = [] : this.selectedList = Array.from(this.dataSource);
  }

  async deleteList() {
    // const r = await this.mydialog.openDialog('role').toPromise();
    // if (r === 'ok') {
    const sub = this.service.deleteRangeByIds(this.selectedList.map(e => e.id)).subscribe(() => {
      this.selectedList = [];
      this.update.next(true);
    });

    this.subs.push(sub);
    // }
  }

  ngOnDestroy(): void {
    this.subs.forEach(e => {
      e.unsubscribe();
    });
  }
}
