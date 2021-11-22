import { Component, OnInit, Input } from '@angular/core';
import { IEntity as Entity, tableSymbol } from '../decorators/column';
import { ColumnModel } from './../decorators/column.model';
import { TableModel } from './../decorators/table.model';
// import { sortBy, orderBy, cloneDeep } from 'lodash';
import { Sort, SortDirection } from '@angular/material/sort';
import { cloneDeep } from 'src/environments/environment';
import { UowService } from 'src/app/services/uow.service';
import { SuperService } from 'src/app/services/super.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/models';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  private _data = [];
  // tslint:disable-next-line:variable-name
  private _originalData: any[] = [];
  // tslint:disable-next-line:variable-name
  private _tableModel: TableModel;

  isLoadingResults = true;
  resultsLength = 0;
  isRateLimitReached = false;

  subs: Subscription[] = [];

  dataSource: any[] = [];

  opt = new Entity();

  @Input() set data(values: any[]) {
    if (values && values.length > 0) {
      // this._data = cloneDeep(values);
      this._data = values;

      this.opt = values[0];

      console.log(this.opt);

      this._tableModel = this._data[0][tableSymbol];
      this.buildColumns();
      if (!this._originalData.length) {
        // Keep original order of data
        // this._originalData = cloneDeep(this._data);
        this._originalData = this._data;
      }
    }
  }
  get data(): any[] {
    return this._data;
  }
  @Input() instance: any;

  columns: ColumnModel[];
  displayedColumns: string[];

  constructor(private uow: UowService) { }

  ngOnInit() {
    // test
    const u = new User();
    console.log(u);
    this.opt = (u as any).opt;
    console.log(this.opt);


    this._tableModel = u[tableSymbol];
    this.buildColumns();
    this.getPage(0, 10, 'id', 'desc');
  }

  sortData(params: Sort) {
    // const direction: SortDirection = params.direction;
    // this.data = direction
    //   ? orderBy(this.data, [params.active], [direction])
    //   : this._originalData;

  }

  getPage(startIndex, pageSize, sortBy, sortDir) {
    console.log(startIndex, pageSize, sortBy, sortDir);
    // const sub = this.uow.infos.getAll(startIndex, pageSize, sortBy, sortDir, icon, text, name, href,).subscribe(
    const args = this.columns.filter(e => e.canFilter).map(e => e.key);
    const sub = (this.uow[this.opt.serviceName] as SuperService<any>).getPage(startIndex, pageSize, sortBy, sortDir, ...args).subscribe(
      (r: any) => {
        console.log(r.list);
        this.dataSource = r.list;
        this.resultsLength = r.count;
        this.isLoadingResults = false;
      }
    );

    this.subs.push(sub);
  }

  private buildColumns() {
    this.columns = this._tableModel.columns;
    this.sortColumns();
    this.displayedColumns = this.columns.map(col => col.key);
  }

  private sortColumns() {
    // this.columns = sortBy(this.columns, ['order']);
  }
}
